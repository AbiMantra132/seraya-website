import re

with open('app/admin/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the specific section for gallery upload
start_str = '{/* Upload Section */}'
end_str = '{isLoading ? "Menyimpan..." : (galleryId ? "Update Galeri" : "Upload Galeri")}'

start_idx = content.find(start_str)
end_idx = content.find(end_str, start_idx)

if start_idx != -1 and end_idx != -1:
    # go back to the start of the line for start_idx
    start_idx = content.rfind('\n', 0, start_idx) + 1
    # go to the start of the end_str
    
    # We want to replace the whole upload section with a simpler one: Instagram URL input + Thumbnail input
    new_section = '''                {/* Upload Section */}
                <div className="bg-gray-50/50 p-6 md:p-8 rounded-[32px] border border-gray-100 space-y-6">
                  <div>
                    <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">URL Instagram</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                      </div>
                      <input 
                        type="url" 
                        value={galleryInstagramUrl}
                        onChange={(e) => setGalleryInstagramUrl(e.target.value)}
                        className="w-full bg-white border border-gray-200 focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 text-[#111111] pl-14 pr-6 py-4 md:py-5 rounded-2xl focus:outline-none transition-all font-medium shadow-sm" 
                        placeholder="https://www.instagram.com/p/..." 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Thumbnail Konten (Ditampilkan di Overview)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      id="galleryThumbnail"
                      onChange={handleGalleryThumbnailChange}
                    />
                    <label 
                      htmlFor="galleryThumbnail"
                      className="w-full bg-white border-2 border-dashed border-gray-200 text-[#555555] px-6 py-8 rounded-2xl text-center cursor-pointer hover:border-[#FF7A00] hover:bg-[#FF7A00]/5 hover:text-[#FF7A00] transition-all font-medium shadow-sm flex flex-col items-center justify-center gap-3"
                    >
                      {galleryThumbnailUrl ? (
                        <div className="flex flex-col items-center gap-3">
                          <img src={galleryThumbnailUrl} alt="Thumbnail preview" className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm" />
                          <span className="text-[#FF7A00] font-bold flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Gambar Dipilih
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center shadow-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          </div>
                          <span className="font-bold text-[#111111]">Pilih Foto Thumbnail</span>
                          <span className="text-xs font-medium text-gray-400">Mendukung JPG, PNG</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={submitGallery}
                    disabled={isLoading}
                    className="bg-[#111111] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#FF7A00] hover:shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    '''
    
    content = content[:start_idx] + new_section + content[end_idx:]
    with open('app/admin/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("done script 2")
else:
    print("could not find section")
