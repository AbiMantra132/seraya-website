import Image from "next/image";
import Link from "next/link";
import AnimationWrapper from "./components/AnimationWrapper";
import { neon } from "@neondatabase/serverless";

export const revalidate = 0;

export default async function Home() {
  let latestBlogs: any[] = [];
  let latestGalleries: any[] = [];
  try {
    const sql = neon(process.env.DATABASE_URL!);
    latestBlogs = await sql`SELECT * FROM blogs ORDER BY created_at DESC LIMIT 4;`;
    latestGalleries = await sql`SELECT * FROM galleries ORDER BY created_at DESC LIMIT 4;`;
  } catch (error) {
    console.error('Failed to fetch data for homepage:', error);
  }

  return (
    <AnimationWrapper>
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-12 pt-32">
        <section className="flex flex-col items-center justify-center min-h-[85vh] pt-24 pb-24 h-full relative z-10 text-center">
          {/* Vertical Growth Lines Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full overflow-hidden pointer-events-none z-[-1] opacity-10">
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Vertical lines growing upwards from the bottom */}
              <line x1="15%" y1="100%" x2="15%" y2="20%" stroke="#555555" strokeWidth="1" pathLength="1" className="animate-draw-line-normalized" />
              <line x1="35%" y1="100%" x2="35%" y2="45%" stroke="#555555" strokeWidth="1" pathLength="1" className="animate-draw-line-normalized" style={{ animationDelay: '0.5s' }} />
              <line x1="50%" y1="100%" x2="50%" y2="10%" stroke="#555555" strokeWidth="1" pathLength="1" className="animate-draw-line-normalized" style={{ animationDelay: '1.2s' }} />
              <line x1="70%" y1="100%" x2="70%" y2="35%" stroke="#555555" strokeWidth="1" pathLength="1" className="animate-draw-line-normalized" style={{ animationDelay: '0.8s' }} />
              <line x1="85%" y1="100%" x2="85%" y2="25%" stroke="#555555" strokeWidth="1" pathLength="1" className="animate-draw-line-normalized" style={{ animationDelay: '1.5s' }} />
            </svg>
          </div>

          {/* Floating Badges */}
          <div className="hero-badge absolute top-16 left-5 lg:left-24 z-0 hidden lg:block">
            <div className="transform hover:-translate-y-2 hover:-rotate-3 transition-all duration-300 animate-float">
              <div className="bg-[#FF7A00] text-white px-8 py-4 rounded-2xl font-bold text-2xl tracking-wide shadow-[0_15px_30px_-5px_rgba(255,122,0,0.3)]">
                Belajar
              </div>
            </div>
          </div>

          <div className="hero-badge absolute top-40 right-5 lg:right-24 z-0 hidden lg:block">
            <div className="transform hover:-translate-y-2 hover:rotate-3 transition-all duration-300 animate-float-reverse" style={{ animationDelay: "1s" }}>
              <div className="bg-[#111111] text-white px-8 py-4 rounded-2xl font-bold text-2xl tracking-wide shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]">
                Berkarya
              </div>
            </div>
          </div>

          <div className="hero-badge absolute bottom-24 left-10 lg:left-40 z-0 hidden lg:block">
            <div className="transform hover:-translate-y-2 hover:rotate-2 transition-all duration-300 animate-float" style={{ animationDelay: "2s" }}>
              <div className="bg-[#EAEAEA] text-[#111111] px-8 py-4 rounded-2xl font-bold text-2xl tracking-wide shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)]">
                Berdampak
              </div>
            </div>
          </div>

          {/* Top Content (Centered) */}
          <div className="z-10 flex flex-col items-center relative w-full max-w-[1200px]">
            <h1 className="hero-element text-[48px] sm:text-[56px] md:text-[72px] lg:text-[84px] leading-[1.05] font-bold tracking-tighter mb-12 text-[#111111] flex flex-col items-center gap-2 cursor-default">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                <span className="inline-block animate-float-subtle">
                  Serentak
                </span>
                <span className="inline-block animate-float-subtle-reverse" style={{ animationDelay: '0.5s' }}>
                  Berkarya
                </span>
              </div>
              <span className="inline-block bg-[#FF7A00] text-white px-6 md:px-8 py-2 md:py-3 rounded-2xl mt-4 hover:shadow-[0_10px_20px_rgba(255,122,0,0.3)] transition-shadow duration-300 animate-float-subtle" style={{ animationDelay: '1s' }}>
                Berdampak Nyata
              </span>
            </h1>

            <p className="hero-element text-[#111111]/70 text-[16px] md:text-[20px] mb-16 max-w-[600px] leading-relaxed font-medium transition-all duration-500 hover:text-[#111111] px-4 md:px-0">
              Knowledge is not a privilege, but knowledge is everyone's right
            </p>

            <div className="hero-element w-full px-6 flex flex-col items-center">
              <div className="flex w-full sm:w-auto">
                <a href="#about" className="group w-full sm:w-auto justify-center relative overflow-hidden inline-flex bg-[#111111] text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)] hover:-translate-y-1 active:scale-95">
                  {/* Sweep Background */}
                  <span className="absolute inset-0 w-full h-full bg-[#FF7A00] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                  
                  {/* Button Content */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">Mulai Belajar</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-0 opacity-0 -translate-x-4 transition-all duration-300 group-hover:w-6 group-hover:opacity-100 group-hover:translate-x-0">
                      <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Dynamic Connector */}
        <div className="flex justify-center w-full -mt-8 mb-24 relative z-20">
          <div className="w-[2px] h-24 bg-gradient-to-b from-[#111111]/30 to-transparent animate-pulse"></div>
        </div>

        {/* About Section */}
        <section id="about" className="reveal-section flex flex-col items-start justify-center pb-32 w-full relative z-10">
          <div className="w-full max-w-[1400px] mx-auto">
            <h2 className="text-[32px] md:text-[52px] lg:text-[68px] leading-[1.4] md:leading-[1.2] font-bold text-[#111111] tracking-tighter">
              Di Seraya, kami 
              <span className="inline-block align-middle mx-2 md:mx-3 w-[80px] md:w-[180px] lg:w-[240px] h-[32px] md:h-[72px] lg:h-[80px] bg-[#EAEAEA] rounded-full overflow-hidden relative shadow-sm md:animate-breathe">
                <div className="absolute inset-0 bg-cover bg-[center_25%]" style={{ backgroundImage: "url('/hero_image.jpg')" }}></div>
              </span> 
              mewujudkan berbagai program Kolaborasi & Langkah Nyata 
              <span className="inline-flex items-center justify-center align-middle mx-2 md:mx-3 px-4 md:px-8 lg:px-10 py-1 md:py-0 md:h-[72px] lg:h-[80px] bg-[#FF7A00] rounded-full relative shadow-sm text-white text-[20px] md:text-3xl lg:text-[40px] font-bold tracking-wide md:animate-breathe" style={{ animationDelay: '0.5s' }}>
                Inovasi
              </span> 
              anak muda termasuk 
              <span className="inline-flex items-center justify-center align-middle mx-2 md:mx-3 px-4 md:px-8 lg:px-10 py-1 md:py-0 md:h-[72px] lg:h-[80px] bg-[#111111] rounded-full relative shadow-sm text-white text-[20px] md:text-3xl lg:text-[40px] font-bold tracking-wide md:animate-breathe" style={{ animationDelay: '1s' }}>
                 Edukasi
              </span> 
              berbasis kreativitas
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 mt-16">
              <a href="#content" className="bg-[#111111] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-black transition-colors duration-300 flex items-center gap-3">
                Lihat Konten
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce mt-1">
                  <path d="M12 5v14M19 12l-7 7-7-7"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Instagram Content Section (Dummy) */}
        <section id="content" className="reveal-section flex flex-col items-start justify-center pb-32 w-full relative z-10">
          <div className="w-full max-w-[1400px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#111111] mb-8 tracking-tight">
              Jelajahi konten terbaru kami
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {latestGalleries.length > 0 ? latestGalleries.map((post, index) => (
                <a href={post.instagram_url} target="_blank" rel="noreferrer" key={index} className="flex flex-col gap-4 group cursor-pointer">
                  {/* Content Thumbnail */}
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[#EAEAEA] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${post.thumbnail}')` }}></div>
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
                    
                    {/* Glassmorphism Play Button */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm border border-white/20">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#444444" className="ml-1">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-1">
                    <div className="w-10 h-10 rounded-full bg-[#EAEAEA] overflow-hidden shrink-0">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/logo.png')" }}></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-[#111111] leading-tight">Seraya Official</span>
                      <span className="text-[14px] text-[#555555] line-clamp-1">{post.title}</span>
                    </div>
                  </div>
                </a>
              )) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center py-10 text-gray-500 font-bold">Belum ada konten galeri.</div>
              )}
            </div>
            
            {/* Simple Button Link to Content Page */}
            <div className="flex justify-center mt-12">
               <Link href="/content" className="bg-[#111111] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#FF7A00] transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)] hover:-translate-y-1 active:scale-95 inline-flex items-center gap-3">
                  Lihat Konten
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
               </Link>
            </div>

          </div>
        </section>

        {/* Modern Dynamic Blog Intro */}
        <div className="reveal-section w-full max-w-[1400px] mx-auto px-6 pt-32 pb-24 relative z-10 overflow-hidden">
          <div className="flex flex-col items-start relative">
            {/* Giant Watermark Text */}
            <span className="absolute -top-8 md:-top-16 left-0 text-[60px] md:text-[100px] lg:text-[150px] font-black text-[#E5E5E5] -z-10 tracking-tighter leading-none select-none pointer-events-none">
              STORIES
            </span>
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-6 md:gap-10 relative z-10 pt-10">
              <div className="flex flex-col max-w-[800px] group">
                <div className="w-12 h-1 bg-[#FF7A00] mb-8 group-hover:w-32 transition-all duration-500 ease-out"></div>
                <h2 className="text-[48px] md:text-[68px] font-black text-[#111111] leading-[1.05] tracking-tighter">
                  News <br/> 
                  <span className="text-[#FF7A00]">
                    Seraya.
                  </span>
                </h2>
              </div>
              <p className="text-[#555555] text-[18px] md:text-[20px] font-medium leading-relaxed max-w-[400px] text-left md:text-right md:pb-2">
                Temukan inspirasi, gagasan segar, dan rekam jejak kolaborasi hebat pemuda Indonesia.
              </p>
            </div>
          </div>
        </div>

        {/* Blog Section Content */}
        <section id="news" className="reveal-section flex flex-col items-center justify-center pb-32 w-full relative z-10">
          <div className="w-full max-w-[1400px] mx-auto px-6">
            
            {latestBlogs.length > 0 ? (
              <>
                {/* Featured Post (Top) */}
                <div className="flex flex-col lg:flex-row gap-8 items-center mb-12">
                  {/* Left Content */}
                  <div className="flex-1 order-2 lg:order-1 flex flex-col items-start pr-0 lg:pr-8">
                    <span className="border-2 border-[#111111] text-[#111111] px-4 py-2 rounded-full text-[13px] font-bold uppercase tracking-wider mb-6">
                      {latestBlogs[0].category || 'Featured'}
                    </span>
                    <h3 className="text-[40px] md:text-[52px] font-bold text-[#111111] leading-[1.1] mb-6 tracking-tight">
                      {latestBlogs[0].title}
                    </h3>
                    <p className="text-[#555555] text-[18px] md:text-[20px] font-medium leading-relaxed mb-8 line-clamp-3">
                      {latestBlogs[0].content.replace(/<[^>]+>/g, '')}
                    </p>
                    <Link href={`/news/${latestBlogs[0].id}`} className="font-bold text-[18px] text-[#111111] flex items-center gap-2 hover:text-[#FF7A00] transition-colors group">
                      Baca Berita 
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </Link>
                  </div>
                  
                  {/* Right Image */}
                  <div className="flex-1 order-1 lg:order-2 w-full relative">
                    <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full bg-[#EAEAEA] rounded-3xl z-0"></div>
                    <div className="relative z-10 w-full aspect-[4/3] bg-[#F5F5F5] overflow-hidden rounded-3xl shadow-sm">
                      <Link href={`/news/${latestBlogs[0].id}`}>
                        <div className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105 cursor-pointer" style={{ backgroundImage: `url('${latestBlogs[0].cover_image || '/hero_image.jpg'}')` }}></div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sub Posts (Bottom 3 Columns) */}
                {latestBlogs.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {latestBlogs.slice(1).map((post, idx) => (
                      <div key={idx} className="flex flex-col items-start group">
                        <div className="w-full aspect-[16/10] bg-[#F5F5F5] overflow-hidden rounded-2xl mb-6 shadow-sm">
                          <Link href={`/news/${post.id}`}>
                            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 cursor-pointer" style={{ backgroundImage: `url('${post.cover_image || '/hero_image.jpg'}')` }}></div>
                          </Link>
                        </div>
                        <span className="border-2 border-[#111111] text-[#111111] px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
                          {post.category || 'Category'}
                        </span>
                        <h4 className="text-[24px] font-bold text-[#111111] leading-[1.2] mb-3 tracking-tight group-hover:text-[#FF7A00] transition-colors cursor-pointer line-clamp-2">
                          <Link href={`/news/${post.id}`}>{post.title}</Link>
                        </h4>
                        <p className="text-[#555555] text-base font-medium leading-relaxed mb-6 line-clamp-3">
                          {post.content.replace(/<[^>]+>/g, '')}
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
              </>
            ) : (
              <div className="w-full text-center py-10 text-gray-500 font-bold">Belum ada berita.</div>
            )}

            {/* See All Blog Action */}
            <div className="flex justify-center mt-16">
               <Link href="/news" className="bg-[#111111] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#FF7A00] transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)] hover:-translate-y-1 active:scale-95 inline-flex items-center gap-3">
                  Lihat Semua Berita
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
               </Link>
            </div>

          </div>
        </section>

        {/* Quiz CTA Section */}
        <section id="quiz-cta" className="reveal-section w-full flex justify-center pb-32 px-6 relative z-10">
          <div className="w-full max-w-[1400px] bg-[#111111] rounded-[32px] md:rounded-[48px] overflow-hidden relative shadow-2xl">
            {/* Background Glow Decorations */}
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF7A00] opacity-20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-white opacity-5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20 relative z-10 gap-12">
              <div className="flex flex-col items-start max-w-[650px]">
                <span className="inline-block bg-white/10 text-[#F5F5F5] px-4 py-2 rounded-full font-bold text-xs tracking-widest uppercase mb-6 backdrop-blur-md border border-white/10">
                  Kuis Interaktif
                </span>
                <h2 className="text-[40px] md:text-[56px] font-black text-white leading-[1.05] mb-6 tracking-tight">
                  Tantang Dirimu, Temukan Peranmu!
                </h2>
                <p className="text-white/70 text-[18px] md:text-[20px] font-medium leading-relaxed mb-0">
                  Seberapa jauh kamu memahami isu-isu sosial di sekitarmu? Uji pengetahuanmu dan temukan inisiatif apa yang paling cocok untuk kamu perjuangkan bersama Seraya.
                </p>
              </div>
              
              <div className="flex-shrink-0 w-full md:w-auto flex justify-start md:justify-end">
                <Link href="/quiz" className="w-full md:w-auto group relative inline-flex items-center justify-center gap-2 md:gap-3 bg-[#FF7A00] text-white px-6 py-4 md:px-10 md:py-5 rounded-full font-bold text-base md:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-[#ff8a1a] shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)]">
                  <span className="relative z-10">Kerjakan Kuis</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-300 group-hover:translate-x-2 w-5 h-5 md:w-6 md:h-6">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

    </AnimationWrapper>
  );
}
