import Link from "next/link";
import Image from "next/image";
import { neon } from "@neondatabase/serverless";

export const revalidate = 0; // Disable static rendering for this page

export default async function ContentIndex() {
  let galleries: any[] = [];
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`SELECT * FROM galleries ORDER BY created_at DESC;`;
    galleries = rows.map(r => ({
      ...r,
      createdAt: r.created_at,
      instagramUrl: r.instagram_url
    }));
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
  }

  const contents = galleries.map((g: any, i: number) => ({
    id: g.id,
    title: g.title,
    type: (g.type || "").toLowerCase() === "video" ? "video" : "photo",
    image: g.thumbnail || "/hero_image.jpg",
    url: g.instagramUrl || "#",
    height: i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"
  }));

  return (
    <main className="flex-1 w-full bg-white pt-52 pb-24 relative z-10">
      {/* Content Intro */}
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
          GALLERY
        </span>
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-6 md:gap-10 relative z-10 pt-24 md:pt-36">
          <div className="flex flex-col max-w-[800px] group">
            <div className="w-12 h-1 bg-[#FF7A00] mb-8 group-hover:w-32 transition-all duration-500 ease-out"></div>
            <h1 className="text-[48px] md:text-[68px] font-black text-[#111111] leading-[1.05] tracking-tighter">
              Eksplorasi <br/> 
              <span className="text-[#FF7A00]">
                Konten Kami.
              </span>
            </h1>
          </div>
          <p className="text-[#555555] text-[18px] md:text-[20px] font-medium leading-relaxed max-w-[400px] text-left md:text-right md:pb-2">
            Lihat lebih dekat aksi nyata, keseruan, dan karya inspiratif Seraya melalui lensa visual.
          </p>
        </div>
      </div>

      {/* Masonry-like Grid */}
      <section className="w-full max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6">
          {contents.map((post, idx) => (
            <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-3 group cursor-pointer">
              {/* Thumbnail Container */}
              <div className={`relative w-full ${post.height} rounded-2xl overflow-hidden bg-[#F5F5F5] shadow-sm`}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${post.image}')` }}></div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Format Indicator Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-sm z-10">
                  {post.type === "video" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="ml-[2px]">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 z-20">
                  <span className="text-white font-bold tracking-wider text-sm border-2 border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    {post.type === "video" ? "Tonton Video" : "Lihat Foto"}
                  </span>
                </div>
              </div>
              
              {/* Meta Info */}
              <div className="flex items-start gap-3 px-1 mt-1">
                <div className="w-8 h-8 rounded-full bg-[#EAEAEA] overflow-hidden shrink-0 mt-1">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#111111] leading-tight mb-1">Seraya Official</span>
                  <span className="text-[13px] text-[#555555] line-clamp-2 leading-snug">{post.title}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      
      {/* Load More Button */}
      <div className="w-full flex justify-center mt-20">
        <button className="bg-transparent border-2 border-[#111111] text-[#111111] px-8 py-3 rounded-full font-bold text-base hover:bg-[#111111] hover:text-white transition-all duration-300 active:scale-95">
          Muat Lebih Banyak
        </button>
      </div>
    </main>
  );
}
