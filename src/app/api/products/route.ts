import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    const featured = searchParams.get('featured');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    // Build query
    const query: any = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Build sort
    const sortObj: any = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;

    // Execute query
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('category', 'name slug')
        .sort(sortObj)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { success: false, error: 'Ürünler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // TODO: Add admin auth check

    const body = await req.json();

    // Generate SKU if not provided
    if (!body.sku) {
      body.sku = `APR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    const product = await Product.create(body);

    return NextResponse.json(
      { success: true, data: product, message: 'Ürün oluşturuldu' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Ürün oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

