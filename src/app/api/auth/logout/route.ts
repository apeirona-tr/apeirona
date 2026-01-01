import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Çıkış başarılı' },
      { status: 200 }
    );

    // Clear cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
    });

    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Çıkış sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

