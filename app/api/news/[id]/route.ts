import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM blogs WHERE id = ${id};`;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const record = {
      ...rows[0],
      createdAt: rows[0].created_at,
      coverImage: rows[0].cover_image
    };

    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const payload = await req.json();

    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`
      UPDATE blogs 
      SET title = ${payload.title}, 
          category = ${payload.category}, 
          cover_image = ${payload.coverImage}, 
          content = ${payload.content}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const record = {
      ...rows[0],
      createdAt: rows[0].created_at,
      coverImage: rows[0].cover_image
    };

    return NextResponse.json(record);
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM blogs WHERE id = ${id};`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
