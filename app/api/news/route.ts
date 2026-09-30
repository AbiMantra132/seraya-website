import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const revalidate = 0;

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM blogs ORDER BY created_at DESC;`;
    
    const records = rows.map(r => ({
      ...r,
      createdAt: r.created_at,
      coverImage: r.cover_image
    }));
    
    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    
    if (!payload.title || !payload.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`
      INSERT INTO blogs (title, category, cover_image, content)
      VALUES (${payload.title}, ${payload.category || 'Umum'}, ${payload.coverImage || ''}, ${payload.content})
      RETURNING *;
    `;

    const record = {
      ...rows[0],
      createdAt: rows[0].created_at,
      coverImage: rows[0].cover_image
    };

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
