import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PlannerOption from '@/models/PlannerOption';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    const query: any = { isActive: true };
    if (type) {
      query.type = type;
    }

    const options = await PlannerOption.find(query).sort({ order: 1 });

    // Group by type if no specific type requested
    if (!type) {
      const grouped = options.reduce((acc: any, option) => {
        if (!acc[option.type]) {
          acc[option.type] = [];
        }
        acc[option.type].push(option);
        return acc;
      }, {});

      return NextResponse.json({
        success: true,
        data: grouped,
      });
    }

    return NextResponse.json({
      success: true,
      data: options,
    });
  } catch (error: any) {
    console.error('Get planner options error:', error);
    return NextResponse.json(
      { success: false, error: 'Seçenekler yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // TODO: Add admin auth check

    const body = await req.json();

    const option = await PlannerOption.create(body);

    return NextResponse.json(
      { success: true, data: option, message: 'Seçenek oluşturuldu' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create planner option error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Seçenek oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

