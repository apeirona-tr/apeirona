import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { PlannerOptionType } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as PlannerOptionType | null;
    const parentId = searchParams.get('parentId');

    const where: any = {
      isActive: true,
    };

    if (type) {
      where.type = type;
    }

    if (parentId) {
      where.parentId = parentId;
    } else if (!type) {
      // If no type specified and no parentId, get top-level options
      where.parentId = null;
    }

    const options = await prisma.plannerOption.findMany({
      where,
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: options,
    });
  } catch (error) {
    console.error('Planner options fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Seçenekler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const option = await prisma.plannerOption.create({
      data: {
        type: body.type as PlannerOptionType,
        name: body.name,
        description: body.description,
        image: body.image,
        price: body.price || 0,
        parentId: body.parentId,
        order: body.order || 0,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json({
      success: true,
      data: option,
      message: 'Seçenek başarıyla oluşturuldu',
    });
  } catch (error) {
    console.error('Planner option create error:', error);
    return NextResponse.json(
      { success: false, message: 'Seçenek oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const option = await prisma.plannerOption.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: option,
      message: 'Seçenek başarıyla güncellendi',
    });
  } catch (error) {
    console.error('Planner option update error:', error);
    return NextResponse.json(
      { success: false, message: 'Seçenek güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID gerekli' },
        { status: 400 }
      );
    }

    await prisma.plannerOption.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Seçenek başarıyla silindi',
    });
  } catch (error) {
    console.error('Planner option delete error:', error);
    return NextResponse.json(
      { success: false, message: 'Seçenek silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
