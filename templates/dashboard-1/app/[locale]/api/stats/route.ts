import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/stats - Get all stats
export async function GET() {
  try {
    const stats = await prisma.stat.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

// PUT /api/stats - Update a stat
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const stat = await prisma.stat.update({
      where: { id: body.id },
      data: {
        value: body.value,
      },
    });

    return NextResponse.json(stat);
  } catch (error) {
    console.error('Failed to update stat:', error);
    return NextResponse.json(
      { error: 'Failed to update stat' },
      { status: 500 }
    );
  }
}
