import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    
    // Check if id is slug or ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { _id: id } : { slug: id };

    const product = await Product.findOne({ ...query, isActive: true })
      .populate('category', 'name slug');

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { success: false, error: 'Ürün yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // TODO: Add admin auth check

    const { id } = await params;
    const body = await req.json();

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Ürün güncellendi',
    });
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Ürün güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    // TODO: Add admin auth check

    const { id } = await params;

    const product = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Ürün silindi',
    });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { success: false, error: 'Ürün silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

