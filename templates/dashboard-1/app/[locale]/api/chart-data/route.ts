import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/chart-data - Get chart data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || '2025');

    const chartData = await prisma.chartData.findMany({
      where: { year },
    });

    // Sort by month order
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const sortedData = chartData.sort((a, b) =>
      monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

    return NextResponse.json(sortedData);
  } catch (error) {
    console.error('Failed to fetch chart data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chart data' },
      { status: 500 }
    );
  }
}
