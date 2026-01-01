import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
      userId: string;
      email: string;
      role: string;
    };

    await dbConnect();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        addresses: user.addresses,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, error: 'Yetkilendirme hatası' },
      { status: 401 }
    );
  }
}

