export interface Blog {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  content: string;
  createdAt: string;
}

export interface Gallery {
  id: string;
  title: string;
  type: string;
  instagramUrl: string;
  thumbnail: string;
  createdAt: string;
}
