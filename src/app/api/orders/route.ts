import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `APR-${timestamp}-${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (userId) {
      where.userId = userId;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Siparişler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: body.userId,
        addressId: body.addressId,
        guestEmail: body.guestEmail,
        guestName: body.guestName,
        guestPhone: body.guestPhone,
        shippingAddress: body.shippingAddress,
        subtotal: body.subtotal,
        shippingCost: body.shippingCost || 0,
        discount: body.discount || 0,
        total: body.total,
        paymentMethod: body.paymentMethod,
        notes: body.notes,
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            isCustom: item.isCustom || false,
            customData: item.customData,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Sipariş başarıyla oluşturuldu',
    });
  } catch (error) {
    console.error('Order create error:', error);
    return NextResponse.json(
      { success: false, message: 'Sipariş oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const order = await prisma.order.update({
      where: { id },
      data,
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Sipariş güncellendi',
    });
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { success: false, message: 'Sipariş güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
