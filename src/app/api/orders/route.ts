import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';

// Get user from token
async function getUserFromToken(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
      userId: string;
      email: string;
      role: string;
    };
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query based on role
    const query: any = {};
    if (user.role !== 'admin') {
      query.user = user.userId;
    }

    // Optional filters for admin
    if (user.role === 'admin') {
      const status = searchParams.get('status');
      const paymentStatus = searchParams.get('paymentStatus');
      if (status) query.orderStatus = status;
      if (paymentStatus) query.paymentStatus = paymentStatus;
    }

    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('user', 'name surname email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { success: false, error: 'Siparişler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await req.json();

    // Validate required fields
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Sepetiniz boş' },
        { status: 400 }
      );
    }

    if (!body.shippingAddress || !body.billingAddress) {
      return NextResponse.json(
        { success: false, error: 'Adres bilgileri gerekli' },
        { status: 400 }
      );
    }

    // Create order
    const order = await Order.create({
      ...body,
      user: user.userId,
    });

    return NextResponse.json(
      { success: true, data: order, message: 'Sipariş oluşturuldu' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Sipariş oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

