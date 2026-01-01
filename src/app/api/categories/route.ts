import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
        parentId: null, // Only top-level categories
      },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Categories fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Kategoriler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
        description: body.description,
        image: body.image,
        parentId: body.parentId,
        order: body.order || 0,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Kategori başarıyla oluşturuldu',
    });
  } catch (error) {
    console.error('Category create error:', error);
    return NextResponse.json(
      { success: false, message: 'Kategori oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}
