import re

with open('app/content/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
content = content.replace(
    'import Image from "next/image";',
    'import Image from "next/image";\nimport { getDbData } from "@/lib/db";'
)

# Make component async and fetch data
old_comp = '''export default function ContentIndex() {
  const contents = Array(12).fill(null).map((_, i) => ({
    id: i + 1,
    title: i % 2 === 0 ? "Keseruan Aksi Serentak di Berbagai Kota" : "Behind The Scenes: Kolaborasi Pemuda",
    type: i % 3 === 0 ? "video" : "photo",
    image: "/hero_image.jpg",
    height: i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"
  }));'''

new_comp = '''export default async function ContentIndex() {
  const db = getDbData();
  const contents = db.galleries.map((g, i) => ({
    id: g.id,
    title: g.title,
    type: g.type.toLowerCase() === "video" ? "video" : "photo",
    image: g.thumbnail || "/hero_image.jpg",
    url: g.instagramUrl || "#",
    height: i % 2 === 0 ? "aspect-[3/4]" : "aspect-square"
  }));'''
content = content.replace(old_comp, new_comp)

# Wrap cards with anchor tag
old_card_start = '''          {contents.map((post, idx) => (
            <div key={idx} className="flex flex-col gap-3 group cursor-pointer">'''

new_card_start = '''          {contents.map((post, idx) => (
            <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-3 group cursor-pointer">'''
content = content.replace(old_card_start, new_card_start)

# End of card
old_card_end = '''                  <span className="text-[13px] text-[#555555] line-clamp-2 leading-snug">{post.title}</span>
                </div>
              </div>
            </div>
          ))}'''

new_card_end = '''                  <span className="text-[13px] text-[#555555] line-clamp-2 leading-snug">{post.title}</span>
                </div>
              </div>
            </a>
          ))}'''
content = content.replace(old_card_end, new_card_end)

with open('app/content/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("done script 3")
