import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/documents - Get all documents
export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { uploadedAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Transform to match the expected format
    const transformedDocuments = documents.map((doc) => ({
      id: doc.id,
      name: doc.name,
      size: doc.size,
      author: doc.author,
      authorAvatar: doc.user?.avatar || `https://api.dicebear.com/9.x/glass/svg?seed=${doc.author}`,
      uploadedAt: formatUploadDate(doc.uploadedAt),
      icon: doc.icon,
    }));

    return NextResponse.json(transformedDocuments);
  } catch (error) {
    console.error('Failed to fetch documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

// Helper function to format upload date
function formatUploadDate(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays} Days Ago`;
  if (diffDays <= 14) return 'A Week Ago';
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} Weeks Ago`;
  if (diffDays <= 60) return '1 Month Ago';
  return `${Math.floor(diffDays / 30)} Months Ago`;
}

// POST /api/documents - Create a new document
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const document = await prisma.document.create({
      data: {
        name: body.name,
        size: body.size,
        author: body.author,
        authorId: body.authorId,
        icon: body.icon || 'file',
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Failed to create document:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    );
  }
}
