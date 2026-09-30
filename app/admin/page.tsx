"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog, Gallery } from "@/lib/types";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"blog" | "post" | "list_blog" | "list_gallery">("list_blog");

  

  // Blog Form State
  const [blogId, setBlogId] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Featured");
  const [blogContent, setBlogContent] = useState("");
  const [blogCover, setBlogCover] = useState<File | null>(null);
  const [blogCoverUrl, setBlogCoverUrl] = useState("");

  // Gallery Form State
  const [galleryId, setGalleryId] = useState("");
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryType, setGalleryType] = useState("Instagram");
  const [galleryInstagramUrl, setGalleryInstagramUrl] = useState("");
  const [galleryThumbnail, setGalleryThumbnail] = useState<File | null>(null);
  const [galleryThumbnailUrl, setGalleryThumbnailUrl] = useState("");
  
  // Data State
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchBlogs();
      fetchGalleries();
    }
  }, [isLoggedIn]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setBlogs(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchGalleries = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setGalleries(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "adminseraya123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Username atau Password salah!");
    }
  };

  const handleGalleryThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGalleryThumbnail(e.target.files[0]);
      setGalleryThumbnailUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBlogCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogCover(e.target.files[0]);
      setBlogCoverUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // CRUD Operations
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'seraya_preset');
    
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
    
    const data = await res.json();
    if (!res.ok) {
      console.error('Cloudinary upload error:', data);
      throw new Error(data.error?.message || 'Failed to upload image');
    }
    return data.secure_url;
  };

  const submitBlog = async () => {
    setIsLoading(true);
    let coverUrl = blogCoverUrl;
    if (blogCover) {
      coverUrl = await uploadFile(blogCover);
    }
    
    const payload = {
      title: blogTitle,
      category: blogCategory,
      content: blogContent,
      coverImage: coverUrl
    };

    if (blogId) {
      // Update
      await fetch(`/api/news/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // Create
      await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    
    await fetchBlogs();
    resetBlogForm();
    setActiveTab("list_blog");
    setIsLoading(false);
  };

  const submitGallery = async () => {
    setIsLoading(true);
    let thumbnailUrl = galleryThumbnailUrl;
    if (galleryThumbnail) {
      thumbnailUrl = await uploadFile(galleryThumbnail);
    }
    
    const payload = {
      title: galleryTitle,
      type: galleryType,
      instagramUrl: galleryInstagramUrl,
      thumbnail: thumbnailUrl
    };

    if (galleryId) {
      // Update
      await fetch(`/api/gallery/${galleryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // Create
      await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
    
    await fetchGalleries();
    resetGalleryForm();
    setActiveTab("list_gallery");
    setIsLoading(false);
  };

  const deleteBlog = async (id: string) => {
    if(confirm("Yakin ingin menghapus blog ini?")) {
      await fetch(`/api/news/${id}`, { method: 'DELETE' });
      fetchBlogs();
    }
  };

  const deleteGallery = async (id: string) => {
    if(confirm("Yakin ingin menghapus galeri ini?")) {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      fetchGalleries();
    }
  };

  const editBlog = (b: Blog) => {
    setBlogId(b.id);
    setBlogTitle(b.title);
    setBlogCategory(b.category);
    setBlogContent(b.content);
    setBlogCoverUrl(b.coverImage);
    setBlogCover(null);
    setActiveTab("blog");
  };

  const editGallery = (g: Gallery) => {
    setGalleryId(g.id);
    setGalleryTitle(g.title);
    setGalleryType(g.type);
    setGalleryInstagramUrl(g.instagramUrl);
    setGalleryThumbnailUrl(g.thumbnail);
    setGalleryThumbnail(null);
    setActiveTab("post");
  };

  const resetBlogForm = () => {
    setBlogId("");
    setBlogTitle("");
    setBlogCategory("Featured");
    setBlogContent("");
    setBlogCoverUrl("");
    setBlogCover(null);
  };

  const resetGalleryForm = () => {
    setGalleryId("");
    setGalleryTitle("");
    setGalleryType("Instagram");
    setGalleryInstagramUrl("");
    setGalleryThumbnailUrl("");
    setGalleryThumbnail(null);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen w-full bg-[#F5F5F5] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#FF7A00] opacity-10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-gray-300 opacity-20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="w-full max-w-md bg-white border border-gray-200 p-10 rounded-[32px] shadow-xl relative z-10 animate-in zoom-in duration-500">
          <div className="flex justify-center mb-8">
            <span className="font-bold text-3xl tracking-widest text-[#111111]">
              <span className="text-[#FF7A00]">S</span>ERAYA<span className="text-gray-400 text-sm ml-2">ADMIN</span>
            </span>
          </div>

          <h1 className="text-2xl font-black text-[#111111] mb-6 text-center">Login ke Dasbor</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 p-4 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-top-4">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[#555555] text-sm font-bold uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#F5F5F5] border border-transparent text-[#111111] px-5 py-4 rounded-xl focus:outline-none focus:border-[#FF7A00] focus:bg-white transition-colors"
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[#555555] text-sm font-bold uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5F5F5] border border-transparent text-[#111111] px-5 py-4 rounded-xl focus:outline-none focus:border-[#FF7A00] focus:bg-white transition-colors"
                placeholder="Masukkan password"
                required
              />
            </div>

            <button type="submit" className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#FF7A00] transition-colors duration-300 shadow-lg hover:shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)]">
              Masuk
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-gray-400 hover:text-[#111111] transition-colors text-sm font-bold inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Kembali ke Website Utama
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-full bg-white flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Attached Sidebar */}
      <aside className="w-full md:w-[280px] bg-white border-r border-gray-100 flex flex-col shrink-0 h-full relative z-20">
        <div className="p-8 pb-4">
          <span className="font-bold text-3xl tracking-widest text-[#111111]">
            <span className="text-[#FF7A00]">S</span>ERAYA<span className="text-gray-400 text-sm ml-2 hidden md:inline">CMS</span>
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-4 mt-6 overflow-y-auto custom-scrollbar">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mt-4 mb-2">Riwayat</span>
          
          <button 
            onClick={() => { setActiveTab("list_blog"); resetBlogForm(); }}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold transition-all duration-300 ${activeTab === "list_blog" ? "bg-[#FF7A00]/10 text-[#FF7A00]" : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#111111]"}`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeTab === "list_blog" ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-400"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </div>
            Daftar News
          </button>
          
          <button 
            onClick={() => { setActiveTab("list_gallery"); resetGalleryForm(); }}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold transition-all duration-300 ${activeTab === "list_gallery" ? "bg-[#FF7A00]/10 text-[#FF7A00]" : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#111111]"}`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeTab === "list_gallery" ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-400"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            Daftar Galeri
          </button>
          
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mt-6 mb-2">Aksi</span>

          <button 
            onClick={() => { setActiveTab("blog"); resetBlogForm(); }}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold transition-all duration-300 ${activeTab === "blog" ? "bg-[#FF7A00]/10 text-[#FF7A00]" : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#111111]"}`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeTab === "blog" ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-400"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            Tulis News
          </button>
          
          <button 
            onClick={() => { setActiveTab("post"); resetGalleryForm(); }}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold transition-all duration-300 ${activeTab === "post" ? "bg-[#FF7A00]/10 text-[#FF7A00]" : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-[#111111]"}`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${activeTab === "post" ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-400"}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            Upload Galeri
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-gray-100">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full bg-gray-50 text-red-500 px-6 py-4 rounded-xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area - Full Width */}
      <div className="flex-1 bg-white overflow-y-auto relative custom-scrollbar z-10">
        <div className="p-8 md:p-12 lg:p-16 max-w-5xl mx-auto min-h-full bg-white">
          
          {/* === DAFTAR BLOG === */}
          {activeTab === "list_blog" && (
            <div className="animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-black text-[#111111] tracking-tight">Riwayat News</h2>
                  <p className="text-gray-500 mt-2 font-medium">Kelola berita yang telah diterbitkan.</p>
                </div>
                <button 
                  onClick={() => { setActiveTab("blog"); resetBlogForm(); }}
                  className="bg-[#111111] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF7A00] transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Buat Baru
                </button>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 hidden md:table-header-group">
                    <tr>
                      <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">Judul</th>
                      <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">Kategori</th>
                      <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">Tanggal</th>
                      <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {blogs.map(blog => (
                      <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors block md:table-row">
                        <td className="px-6 py-4 md:py-5 font-bold text-[#111111] block md:table-cell">{blog.title}</td>
                        <td className="px-6 py-2 md:py-5 text-gray-500 font-medium block md:table-cell">
                          <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold uppercase">{blog.category}</span>
                        </td>
                        <td className="px-6 py-2 md:py-5 text-gray-500 font-medium block md:table-cell">{new Date(blog.createdAt).toLocaleDateString('id-ID')}</td>
                        <td className="px-6 py-4 md:py-5 flex justify-start md:justify-end gap-2 block md:table-cell">
                          <div className="flex gap-2">
                            <button onClick={() => editBlog(blog)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-[#111111] hover:bg-[#FF7A00] hover:text-white transition-colors">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                            </button>
                            <button onClick={() => deleteBlog(blog.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {blogs.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-bold block md:table-cell">Belum ada news yang diterbitkan.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* === DAFTAR GALERI === */}
          {activeTab === "list_gallery" && (
            <div className="animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-4xl font-black text-[#111111] tracking-tight">Riwayat Galeri</h2>
                  <p className="text-gray-500 mt-2 font-medium">Kelola momen galeri yang telah dipublikasikan.</p>
                </div>
                <button 
                  onClick={() => { setActiveTab("post"); resetGalleryForm(); }}
                  className="bg-[#111111] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF7A00] transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Upload Baru
                </button>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 hidden md:table-header-group">
                    <tr>
                      <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">Judul</th>
                      <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">Tipe</th>
                      <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">URL Instagram</th>
                      <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {galleries.map(gal => (
                      <tr key={gal.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors block md:table-row">
                        <td className="px-6 py-4 md:py-5 font-bold text-[#111111] block md:table-cell">{gal.title}</td>
                        <td className="px-6 py-2 md:py-5 text-gray-500 font-medium block md:table-cell">
                          <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold uppercase">{gal.type}</span>
                        </td>
                        <td className="px-6 py-2 md:py-5 text-[#FF7A00] font-bold block md:table-cell truncate max-w-[200px]"><a href={gal.instagramUrl} target="_blank" rel="noreferrer">{gal.instagramUrl}</a></td>
                        <td className="px-6 py-4 md:py-5 flex justify-start md:justify-end gap-2 block md:table-cell">
                          <div className="flex gap-2">
                            <button onClick={() => editGallery(gal)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-[#111111] hover:bg-[#FF7A00] hover:text-white transition-colors">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                            </button>
                            <button onClick={() => deleteGallery(gal.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {galleries.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-bold block md:table-cell">Belum ada galeri yang diupload.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* === TULIS / EDIT BLOG === */}
          {activeTab === "blog" && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-12 flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-black text-[#111111] tracking-tight">{blogId ? 'Edit News' : 'Tulis News Baru'}</h2>
                  <p className="text-gray-500 mt-2 font-medium">{blogId ? 'Lakukan perubahan pada berita Anda.' : 'Buat berita atau cerita menarik untuk pengunjung Seraya.'}</p>
                </div>
                {blogId && (
                  <button onClick={() => { setActiveTab("list_blog"); resetBlogForm(); }} className="text-gray-400 hover:text-[#111111] font-bold">Batal Edit</button>
                )}
              </div>
              
              <div className="space-y-8">
                {/* Meta Section */}
                <div className="bg-gray-50/50 p-6 md:p-8 rounded-[32px] border border-gray-100 space-y-6">
                  <div>
                    <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Judul News</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                      </div>
                      <input 
                        type="text" 
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        className="w-full bg-white border border-gray-200 focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 text-[#111111] pl-14 pr-6 py-4 md:py-5 rounded-2xl focus:outline-none transition-all font-medium shadow-sm" 
                        placeholder="Masukkan judul utama news..." 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Kategori</label>
                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                        </div>
                        <select 
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value)}
                          className="w-full bg-white border border-gray-200 focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 text-[#111111] pl-14 pr-6 py-4 md:py-5 rounded-2xl focus:outline-none transition-all font-medium appearance-none shadow-sm cursor-pointer"
                        >
                          <option value="Featured">Featured</option>
                          <option value="Umum">Umum</option>
                          <option value="Berita">Berita</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Cover Image</label>
                      
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        id="blogCover"
                        onChange={handleBlogCoverChange}
                      />
                      <label 
                        htmlFor="blogCover"
                        className="w-full bg-white border-2 border-dashed border-gray-200 text-[#555555] px-6 py-4 md:py-5 rounded-2xl text-center cursor-pointer hover:border-[#FF7A00] hover:bg-[#FF7A00]/5 hover:text-[#FF7A00] transition-all font-medium shadow-sm flex items-center justify-center gap-2 overflow-hidden"
                      >
                        {blogCoverUrl ? (
                          <div className="flex items-center gap-2 truncate text-[#FF7A00] font-bold">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            Gambar Dipilih
                          </div>
                        ) : (
                          <>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            Pilih Foto Cover
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-gray-50/50 p-6 md:p-8 rounded-[32px] border border-gray-100">
                  <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Isi Konten</label>
                  <textarea 
                    rows={12} 
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full bg-white border border-gray-200 focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 text-[#111111] p-6 rounded-3xl focus:outline-none transition-all font-medium resize-none shadow-sm leading-relaxed" 
                    placeholder="Mulai menulis cerita Anda di sini..."
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={submitBlog}
                    disabled={isLoading}
                    className="bg-[#111111] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#FF7A00] hover:shadow-[0_15px_30px_-5px_rgba(255,122,0,0.4)] hover:-translate-y-1 transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? "Menyimpan..." : (blogId ? "Update News" : "Terbitkan News")}
                    {!isLoading && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* === UPLOAD / EDIT GALERI === */}
          {activeTab === "post" && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-12 flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-black text-[#111111] tracking-tight">{galleryId ? 'Edit Galeri' : 'Upload Galeri'}</h2>
                  <p className="text-gray-500 mt-2 font-medium">{galleryId ? 'Lakukan perubahan pada galeri Anda.' : 'Tambahkan momen-momen seru dalam bentuk foto/video interaktif.'}</p>
                </div>
                {galleryId && (
                  <button onClick={() => { setActiveTab("list_gallery"); resetGalleryForm(); }} className="text-gray-400 hover:text-[#111111] font-bold">Batal Edit</button>
                )}
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
                        <input 
                          type="text" 
                          value={galleryTitle}
                          onChange={(e) => setGalleryTitle(e.target.value)}
                          className="w-full bg-white border border-gray-200 focus:border-[#FF7A00] focus:ring-4 focus:ring-[#FF7A00]/10 text-[#111111] pl-14 pr-6 py-4 md:py-5 rounded-2xl focus:outline-none transition-all font-medium shadow-sm" 
                          placeholder="Keseruan Acara Serentak..." 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#555555] text-sm font-bold uppercase tracking-wider mb-3">Tipe Postingan</label>
                      <div className="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
                        <button 
                          onClick={() => setGalleryType("Foto")}
                          className={`flex-1 font-bold py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 transition-colors ${galleryType === 'Foto' ? 'bg-white text-[#111111] shadow-sm border border-gray-100' : 'text-[#555555] hover:text-[#111111] bg-transparent border-transparent'}`}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          Foto
                        </button>
                        <button 
                          onClick={() => setGalleryType("Video")}
                          className={`flex-1 font-bold py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 transition-colors ${galleryType === 'Video' ? 'bg-white text-[#111111] shadow-sm border border-gray-100' : 'text-[#555555] hover:text-[#111111] bg-transparent border-transparent'}`}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                          Video
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
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
                    {isLoading ? "Menyimpan..." : (galleryId ? "Update Galeri" : "Publish Galeri")}
                    {!isLoading && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
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
