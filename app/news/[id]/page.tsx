import Image from "next/image";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";

export const revalidate = 0; // Disable static rendering for this page

export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let post: any = null;
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM blogs WHERE id = ${id};`;
    if (rows.length > 0) {
      post = {
        ...rows[0],
        createdAt: rows[0].created_at,
        coverImage: rows[0].cover_image
      };
    }
  } catch (error) {
    console.error('Failed to fetch blog:', error);
  }

  if (!post) {
    return notFound();
  }

  // Preserve linebreaks as paragraphs if content does not contain HTML tags
  const renderContent = (content: string) => {
    if (content.includes('<p>') || content.includes('<div>')) {
      return { __html: content };
    }
    // Simple text to HTML conversion
    const html = content.split('\n').filter(p => p.trim() !== '').map(p => `<p class="mb-6">${p}</p>`).join('');
    return { __html: html };
  };

  return (
    <main className="flex-1 w-full bg-white pt-32 pb-24 px-6 sm:px-12 relative z-10">
      <article className="max-w-[1000px] mx-auto w-full">
        {/* Breadcrumb & Back */}
        <div className="mb-12">
          <Link href="/news" className="inline-flex items-center gap-2 text-[#555555] hover:text-[#FF7A00] transition-colors font-semibold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Kembali ke Daftar News
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <span className="inline-block border-2 border-[#111111] text-[#111111] px-4 py-2 rounded-full text-[13px] font-bold uppercase tracking-wider mb-6">
            {post.category}
          </span>
          <h1 className="text-[44px] md:text-[64px] font-black text-[#111111] leading-[1.05] tracking-tight mb-8">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[#555555] font-medium">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EAEAEA] overflow-hidden flex items-center justify-center font-bold text-gray-500">
                S
              </div>
              <span className="text-[#111111] font-bold">Admin Seraya</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EAEAEA]"></span>
            <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#F5F5F5] rounded-[32px] overflow-hidden mb-16 relative shadow-sm">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body */}
        <div 
          className="w-full max-w-[1000px] mx-auto text-[#555555] leading-relaxed text-[18px] md:text-[20px] article-content"
          dangerouslySetInnerHTML={renderContent(post.content)}
        />

        {/* Footer Actions */}
        <div className="max-w-[800px] mx-auto mt-24 pt-12 border-t border-[#EAEAEA] flex justify-center">
           <Link href="/news" className="bg-[#111111] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#FF7A00] transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)] hover:-translate-y-1 active:scale-95 inline-flex items-center gap-3">
              Jelajahi Berita Lainnya
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
           </Link>
        </div>
      </article>
      <style dangerouslySetInnerHTML={{__html: `
        .article-content p {
          margin-bottom: 1.5rem;
        }
      `}} />
    </main>
  );
}
