import Link from "next/link";
import Image from "next/image";
import { neon } from "@neondatabase/serverless";

export const revalidate = 0; // Disable static rendering for this page

export default async function BlogIndex() {
  let posts: any[] = [];
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM blogs ORDER BY created_at DESC;`;
    posts = rows.map(r => ({
      ...r,
      createdAt: r.created_at,
      coverImage: r.cover_image
    }));
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }

  return (
    <main className="flex-1 w-full bg-white pt-52 pb-24 relative z-10">
      {/* News Intro */}
      <div className="w-full max-w-[1400px] mx-auto px-6 mb-16 relative">
        {/* Back to Home Button */}
        <div className="mb-12 relative z-20">
          <Link href="/" className="inline-flex items-center gap-2 text-[#555555] hover:text-[#FF7A00] transition-colors font-bold text-sm uppercase tracking-widest group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
        {/* Giant Watermark Text */}
        <span className="absolute top-8 left-6 text-[60px] md:text-[100px] lg:text-[150px] font-black text-[#E5E5E5] -z-10 tracking-tighter leading-none select-none pointer-events-none">
          NEWS
        </span>
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-6 md:gap-10 relative z-10 pt-24 md:pt-36">
          <div className="flex flex-col max-w-[800px] group">
            <div className="w-12 h-1 bg-[#FF7A00] mb-8 group-hover:w-32 transition-all duration-500 ease-out"></div>
            <h1 className="text-[48px] md:text-[68px] font-black text-[#111111] leading-[1.05] tracking-tighter">
              Kumpulan <br/> 
              <span className="text-[#FF7A00]">
                News Seraya.
              </span>
            </h1>
          </div>
          <p className="text-[#555555] text-[18px] md:text-[20px] font-medium leading-relaxed max-w-[400px] text-left md:text-right md:pb-2">
            Temukan inspirasi, gagasan segar, dan rekam jejak kolaborasi hebat pemuda Indonesia dari masa ke masa.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <section className="w-full max-w-[1400px] mx-auto px-6">
        {posts.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
             </div>
             <h3 className="text-2xl font-bold text-[#111111] mb-2">Belum Ada Berita</h3>
             <p className="text-gray-500 font-medium">Berita baru akan segera hadir. Nantikan informasi menarik dari kami!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post) => (
              <div key={post.id} className="flex flex-col items-start group">
                <Link href={`/news/${post.id}`} className="w-full">
                  <div className="w-full aspect-[16/10] bg-[#F5F5F5] overflow-hidden rounded-[24px] mb-6 shadow-sm">
                     {post.coverImage ? (
                       <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 cursor-pointer" style={{ backgroundImage: `url('${post.coverImage}')` }}></div>
                     ) : (
                       <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 transition-transform duration-700 group-hover:scale-105 cursor-pointer">
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                       </div>
                     )}
                  </div>
                </Link>
                <span className="border-2 border-[#111111] text-[#111111] px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
                  {post.category}
                </span>
                <Link href={`/news/${post.id}`}>
                  <h4 className="text-[24px] font-bold text-[#111111] leading-[1.2] mb-3 tracking-tight group-hover:text-[#FF7A00] transition-colors cursor-pointer">
                    {post.title}
                  </h4>
                </Link>
                <p className="text-[#555555] text-base font-medium leading-relaxed mb-6 line-clamp-3">
                  {post.content.replace(/<[^>]*>?/gm, '')}
                </p>
                <Link href={`/news/${post.id}`} className="font-bold text-base text-[#111111] flex items-center gap-2 hover:text-[#FF7A00] transition-colors mt-auto">
                  Baca Berita 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination (Dummy for now) */}
      {posts.length > 0 && (
        <div className="w-full max-w-[1400px] mx-auto px-6 mt-24">
          <div className="flex items-center justify-center gap-2">
            <button className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#EAEAEA] text-[#A0A0A0] cursor-not-allowed">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#111111] text-white font-bold shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
              1
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#EAEAEA] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
