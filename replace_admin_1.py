import re

with open('app/admin/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Gallery Form State
content = content.replace(
    '  // Gallery Form State\n  const [galleryId, setGalleryId] = useState("");\n  const [galleryTitle, setGalleryTitle] = useState("");\n  const [galleryType, setGalleryType] = useState("Foto");\n  const [galleryFilesUrls, setGalleryFilesUrls] = useState<string[]>([]);',
    '  // Gallery Form State\n  const [galleryId, setGalleryId] = useState("");\n  const [galleryTitle, setGalleryTitle] = useState("");\n  const [galleryType, setGalleryType] = useState("Instagram");\n  const [galleryInstagramUrl, setGalleryInstagramUrl] = useState("");\n  const [galleryThumbnail, setGalleryThumbnail] = useState<File | null>(null);\n  const [galleryThumbnailUrl, setGalleryThumbnailUrl] = useState("");'
)

# Replace handleGalleryThumbnailChange
content = content.replace(
    '  const handleBlogCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {',
    '  const handleGalleryThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    if (e.target.files && e.target.files[0]) {\n      setGalleryThumbnail(e.target.files[0]);\n      setGalleryThumbnailUrl(URL.createObjectURL(e.target.files[0]));\n    }\n  };\n\n  const handleBlogCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {'
)

# Replace submitGallery
old_submit_gallery = '''  const submitGallery = async () => {
    setIsLoading(true);
    let uploadedUrls: string[] = [...galleryFilesUrls];
    
    for (const file of carouselFiles) {
      const url = await uploadFile(file);
      uploadedUrls.push(url);
    }
    
    const payload = {
      title: galleryTitle,
      type: galleryType,
      files: uploadedUrls
    };'''

new_submit_gallery = '''  const submitGallery = async () => {
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
    };'''
content = content.replace(old_submit_gallery, new_submit_gallery)

# Replace editGallery
old_edit_gallery = '''  const editGallery = (g: Gallery) => {
    setGalleryId(g.id);
    setGalleryTitle(g.title);
    setGalleryType(g.type);
    setGalleryFilesUrls(g.files);
    setCarouselFiles([]);
    setCurrentSlide(0);
    setActiveTab("post");
  };'''

new_edit_gallery = '''  const editGallery = (g: Gallery) => {
    setGalleryId(g.id);
    setGalleryTitle(g.title);
    setGalleryType(g.type);
    setGalleryInstagramUrl(g.instagramUrl);
    setGalleryThumbnailUrl(g.thumbnail);
    setGalleryThumbnail(null);
    setActiveTab("post");
  };'''
content = content.replace(old_edit_gallery, new_edit_gallery)

# Replace resetGalleryForm
old_reset_gallery = '''  const resetGalleryForm = () => {
    setGalleryId("");
    setGalleryTitle("");
    setGalleryType("Foto");
    setGalleryFilesUrls([]);
    setCarouselFiles([]);
    setCurrentSlide(0);
  };'''

new_reset_gallery = '''  const resetGalleryForm = () => {
    setGalleryId("");
    setGalleryTitle("");
    setGalleryType("Instagram");
    setGalleryInstagramUrl("");
    setGalleryThumbnailUrl("");
    setGalleryThumbnail(null);
  };'''
content = content.replace(old_reset_gallery, new_reset_gallery)

# In the table, change "Item" to "URL Instagram"
content = content.replace(
    '<th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">Item</th>',
    '<th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-widest">URL Instagram</th>'
)

# And the cell from files.length to instagramUrl
content = content.replace(
    '<td className="px-6 py-2 md:py-5 text-gray-500 font-bold block md:table-cell">{gal.files.length} Foto/Video</td>',
    '<td className="px-6 py-2 md:py-5 text-[#FF7A00] font-bold block md:table-cell truncate max-w-[200px]"><a href={gal.instagramUrl} target="_blank" rel="noreferrer">{gal.instagramUrl}</a></td>'
)

with open('app/admin/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("done script 1")
