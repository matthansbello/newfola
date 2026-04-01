/** Firestore `blogs` document shape (subset used on the public site). */
export interface BlogDocument {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  galleryImages?: string[];
  published?: boolean;
  /** Firestore timestamp */
  createdAt?: { toDate?: () => Date } | null;
}

export interface PublicBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  galleryImages: string[];
  published: boolean;
  createdAt: Date | null;
}
