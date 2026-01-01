import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Product } from '@/models';

// POST - Import products from JSON
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const data = await request.json();
    const { products, mode = 'append' } = data;
    
    if (!products || !Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Geçerli ürün listesi gerekli' },
        { status: 400 }
      );
    }

    let result = {
      imported: 0,
      updated: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Mode: 'replace' = Tüm ürünleri sil ve yenilerini ekle
    // Mode: 'append' = Mevcut ürünlere ekle (SKU varsa güncelle)
    // Mode: 'skip' = Mevcut ürünlere ekle (SKU varsa atla)

    if (mode === 'replace') {
      await Product.deleteMany({});
    }

    for (const product of products) {
      try {
        // SKU kontrolü
        if (!product.sku) {
          result.failed++;
          result.errors.push(`Ürün "${product.name}" için SKU gerekli`);
          continue;
        }

        // Slug oluştur (eğer yoksa)
        if (!product.slug) {
          product.slug = product.name
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        }

        const existingProduct = await Product.findOne({ sku: product.sku });

        if (existingProduct) {
          if (mode === 'skip') {
            continue;
          }
          // Güncelle
          await Product.findByIdAndUpdate(existingProduct._id, product);
          result.updated++;
        } else {
          // Yeni ekle
          await Product.create(product);
          result.imported++;
        }
      } catch (error: any) {
        result.failed++;
        result.errors.push(`${product.name}: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      result
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// GET - Export products as JSON
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const format = searchParams.get('format') || 'json';
    
    let query: any = {};
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).lean();

    if (format === 'csv') {
      // CSV formatında export
      const headers = ['name', 'sku', 'category', 'price', 'compareAtPrice', 'stock', 'isActive', 'isFeatured', 'isNew'];
      let csv = headers.join(',') + '\n';
      
      products.forEach(product => {
        const row = headers.map(header => {
          const value = (product as any)[header];
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value ?? '';
        });
        csv += row.join(',') + '\n';
      });

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=products.csv'
        }
      });
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

