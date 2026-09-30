import sys

with open(r'c:\Users\ABI\Downloads\seraya\app\admin\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('  return (\n    <main className="min-h-screen')

if start_idx == -1:
    print("Could not find start index")
    sys.exit(1)

new_content = content[:start_idx] + r"""  return (
    <main className="h-screen w-full bg-[#F3F4F6] p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6 font-sans overflow-hidden">
      
      {/* Sidebar - Floating Card */}
      <aside className="w-full md:w-[280px] bg-white rounded-[32px] shadow-sm border border-gray-100 flex flex-col shrink-0 overflow-hidden relative z-20">
        <div className="p-8 pb-4">
          <span className="font-bold text-3xl tracking-widest text-[#111111]">
            <span className="text-[#FF7A00]">S</span>ERAYA<span className="text-gray-400 text-sm ml-2 hidden md:inline">CMS</span>
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-3 px-6 mt-6 overflow-y-auto custom-scrollbar">
          <button 
            onClick={() => setActiveTab("blog")}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === "blog" ? "bg-[#FF7A00]/10 text-[#FF7A00]" : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#111111]"}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === "blog" ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-400"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            Tulis Blog
          </button>
          
          <button 
            onClick={() => setActiveTab("post")}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === "post" ? "bg-[#FF7A00]/10 text-[#FF7A00]" : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#111111]"}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === "post" ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-400"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            Upload Galeri
          </button>
        </nav>

        <div className="p-6 mt-auto border-t border-gray-50">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full bg-gray-50 text-red-500 px-6 py-4 rounded-2xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area - Floating Card */}
      <div className="flex-1 bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-y-auto relative custom-scrollbar z-10">
        <div className="p-8 md:p-12 lg:p-16 max-w-5xl mx-auto">
          
          {activeTab === "blog" && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-[#111111] tracking-tight">Tulis Blog Baru</h2>
                <p className="text-gray-500 mt-2 font-medium">Buat artikel, berita, atau cerita menarik untuk pengunjung Seraya.</p>
              </div>
              
              <div className="space-y-8">
                {/* Meta Section */}
                <div className="bg-gray-50/50 p-6 md:p-8 rounded-[32px] border border-gray-100 space-y-6">
                  <div>
                    <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Judul Blog</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                      </div>
                      <input type="text" className="w-full bg-white border border-gray-200 focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 text-[#111111] pl-14 pr-6 py-4 md:py-5 rounded-2xl focus:outline-none transition-all font-medium shadow-sm" placeholder="Masukkan judul utama blog..." />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Kategori</label>
                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                        </div>
                        <select className="w-full bg-white border border-gray-200 focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 text-[#111111] pl-14 pr-6 py-4 md:py-5 rounded-2xl focus:outline-none transition-all font-medium appearance-none shadow-sm cursor-pointer">
                          <option value="featured">Featured</option>
                          <option value="umum">Umum</option>
                          <option value="berita">Berita</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Cover Image</label>
                      <div className="w-full bg-white border-2 border-dashed border-gray-200 text-[#555555] px-6 py-4 md:py-5 rounded-2xl text-center cursor-pointer hover:border-[#FF7A00] hover:bg-[#FF7A00]/5 hover:text-[#FF7A00] transition-all font-medium shadow-sm flex items-center justify-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        Pilih Foto Cover
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-gray-50/50 p-6 md:p-8 rounded-[32px] border border-gray-100">
                  <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Isi Konten</label>
                  <textarea rows={12} className="w-full bg-white border border-gray-200 focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 text-[#111111] p-6 rounded-3xl focus:outline-none transition-all font-medium resize-none shadow-sm leading-relaxed" placeholder="Mulai menulis cerita Anda di sini..."></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                  <button className="bg-[#111111] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#FF7A00] hover:shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-3">
                    Terbitkan Blog
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "post" && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-[#111111] tracking-tight">Upload Galeri</h2>
                <p className="text-gray-500 mt-2 font-medium">Tambahkan momen-momen seru dalam bentuk foto/video interaktif.</p>
              </div>
              
              <div className="space-y-8">
                {/* Info Section */}
                <div className="bg-gray-50/50 p-6 md:p-8 rounded-[32px] border border-gray-100 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Judul Konten</label>
                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        </div>
                        <input type="text" className="w-full bg-white border border-gray-200 focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 text-[#111111] pl-14 pr-6 py-4 md:py-5 rounded-2xl focus:outline-none transition-all font-medium shadow-sm" placeholder="Keseruan Acara Serentak..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Tipe Postingan</label>
                      <div className="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
                        <button className="flex-1 bg-white text-[#111111] font-bold py-3.5 md:py-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center gap-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          Foto
                        </button>
                        <button className="flex-1 text-[#555555] font-bold py-3.5 md:py-4 rounded-xl hover:text-[#111111] transition-colors flex items-center justify-center gap-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                          Video
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="bg-gray-50/50 p-6 md:p-8 rounded-[32px] border border-gray-100">
                  <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-4">Upload File (Pilih Banyak Foto untuk Carousel)</label>
                  
                  {/* Custom File Input Trigger */}
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-[21/9] md:aspect-[3/1] bg-white border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:border-[#FF7A00] hover:bg-[#FF7A00]/5 transition-all group mb-6 shadow-sm"
                  >
                    <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:text-white group-hover:shadow-lg transition-all duration-300">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                      </svg>
                    </div>
                    <span className="font-bold text-[#111111] text-xl">Klik atau Tarik file ke sini</span>
                    <span className="text-[#555555] text-sm mt-2 font-medium">Mendukung format PNG, JPG, JPEG</span>
                  </div>

                  {/* Carousel Preview Area */}
                  {carouselFiles.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-[32px] p-6 relative overflow-hidden shadow-sm">
                      <div className="flex items-center justify-between mb-6 px-2">
                        <span className="text-[#111111] font-bold flex items-center gap-2">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7A00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                          Pratinjau Carousel ({carouselFiles.length} File)
                        </span>
                        <div className="flex gap-2">
                          <button onClick={prevSlide} disabled={currentSlide === 0} className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-gray-50 ${currentSlide === 0 ? "text-gray-300" : "text-[#111111] hover:bg-white hover:border-[#FF7A00] hover:text-[#FF7A00] hover:shadow-md transition-all"}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                          </button>
                          <button onClick={nextSlide} disabled={currentSlide === carouselFiles.length - 1} className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-gray-50 ${currentSlide === carouselFiles.length - 1 ? "text-gray-300" : "text-[#111111] hover:bg-white hover:border-[#FF7A00] hover:text-[#FF7A00] hover:shadow-md transition-all"}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Carousel Track */}
                      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group">
                        {carouselFiles.map((file, idx) => (
                          <div 
                            key={idx}
                            className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-out flex items-center justify-center ${idx === currentSlide ? "translate-x-0" : idx < currentSlide ? "-translate-x-full" : "translate-x-full"}`}
                          >
                            {/* In a real app we'd use URL.createObjectURL(file), but for UI demo we just show the filename and an icon */}
                            <div className="flex flex-col items-center">
                              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                              </svg>
                              <span className="text-[#111111] font-bold max-w-[200px] truncate text-center">{file.name}</span>
                              <span className="bg-[#FF7A00] text-white px-3 py-1 rounded-full font-bold text-xs mt-3">Slide {idx + 1} / {carouselFiles.length}</span>
                            </div>
                            
                            <button 
                              onClick={() => removeFile(idx)}
                              className="absolute top-4 right-4 w-12 h-12 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-red-500 hover:text-white transition-all duration-300 border border-gray-100"
                              title="Hapus foto ini"
                            >
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Dots */}
                      <div className="flex justify-center gap-2 mt-6">
                        {carouselFiles.map((_, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-10 bg-[#FF7A00]" : "bg-gray-200 hover:bg-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <button className="bg-[#111111] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#FF7A00] hover:shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-3">
                    Publish Galeri
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
"""

with open(r'c:\Users\ABI\Downloads\seraya\app\admin\page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replacement successful")
