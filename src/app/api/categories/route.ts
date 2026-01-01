import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const categories = await Category.find({ isActive: true })
      .sort({ order: 1, name: 1 });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { success: false, error: 'Kategoriler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // TODO: Add admin auth check

    const body = await req.json();

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9ğüşıöç]/gi, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const category = await Category.create(body);

    return NextResponse.json(
      { success: true, data: category, message: 'Kategori oluşturuldu' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Kategori oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

