import os

def replace_in_file(filepath, replacements):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old_str, new_str in replacements:
        new_content = new_content.replace(old_str, new_str)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

# Update Navbar
replace_in_file('app/components/Navbar.tsx', [
    ('href="/#blog"', 'href="/#news"'),
    ('>Blog<', '>News<'),
    ('href="/blog"', 'href="/news"')
])

# Update Homepage
replace_in_file('app/page.tsx', [
    ('Blog <br/>', 'News <br/>'),
    ('id="blog"', 'id="news"'),
    ('Read blog', 'Read news'),
    ('Belum ada artikel blog.', 'Belum ada news.'),
    ('Lihat Semua Blog', 'Lihat Semua News'),
    ('href={`/blog/', 'href={`/news/'),
    ('href="/blog"', 'href="/news"')
])

# Update Blog Index (to be News Index)
replace_in_file('app/blog/page.tsx', [
    ('Blog Intro', 'News Intro'),
    ('BLOG', 'NEWS'),
    ('Blog Seraya.', 'News Seraya.'),
    ('Blog Grid', 'News Grid'),
    ('Read blog', 'Read news'),
    ('Belum ada artikel blog.', 'Belum ada news.'),
    ('href={`/blog/', 'href={`/news/')
])

# Update Blog Detail (to be News Detail)
replace_in_file('app/blog/[id]/page.tsx', [
    ('Daftar Blog', 'Daftar News'),
    ('href="/blog"', 'href="/news"')
])

# Update Admin page
replace_in_file('app/admin/page.tsx', [
    ('Kelola Blog', 'Kelola News'),
    ('Tambah Blog', 'Tambah News'),
    ('Edit Blog', 'Edit News'),
    ('Daftar Blog', 'Daftar News')
])

print("Text replacement completed.")
