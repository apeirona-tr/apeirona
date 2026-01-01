import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password, name, surname, phone } = await req.json();

    // Validation
    if (!email || !password || !name || !surname) {
      return NextResponse.json(
        { success: false, error: 'Tüm alanları doldurun' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Bu e-posta adresi zaten kayıtlı' },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name,
      surname,
      phone,
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            role: user.role,
          },
          token,
        },
        message: 'Kayıt başarılı',
      },
      { status: 201 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Kayıt sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

