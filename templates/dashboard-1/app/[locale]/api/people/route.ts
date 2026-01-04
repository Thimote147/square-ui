import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/people - Get all people
export async function GET() {
  try {
    const people = await prisma.person.findMany({
      orderBy: { name: 'asc' },
    });

    // Transform to match the expected format
    const transformedPeople = people.map(person => ({
      id: person.id,
      name: person.name,
      jobTitle: person.jobTitle,
      status: person.status.toLowerCase(),
      email: person.email,
      phone: person.phone,
      tags: person.tags,
      address: person.address,
      avatar: person.avatar || `https://api.dicebear.com/9.x/glass/svg?seed=${person.name}`,
    }));

    return NextResponse.json(transformedPeople);
  } catch (error) {
    console.error('Failed to fetch people:', error);
    return NextResponse.json(
      { error: 'Failed to fetch people' },
      { status: 500 }
    );
  }
}

// POST /api/people - Create a new person
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const person = await prisma.person.create({
      data: {
        name: body.name,
        jobTitle: body.jobTitle,
        status: body.status?.toUpperCase() || 'ACTIVE',
        email: body.email,
        phone: body.phone,
        tags: body.tags || [],
        address: body.address,
        avatar: body.avatar,
      },
    });

    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    console.error('Failed to create person:', error);
    return NextResponse.json(
      { error: 'Failed to create person' },
      { status: 500 }
    );
  }
}
