import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  type DocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogDocument, PublicBlogPost } from "@/types/blog";

function mapBlogDoc(snapshot: DocumentSnapshot): PublicBlogPost {
  const data = snapshot.data() as BlogDocument | undefined;
  if (!data) {
    return {
      id: snapshot.id,
      title: "",
      slug: snapshot.id,
      excerpt: "",
      content: "",
      coverImage: "",
      galleryImages: [],
      published: false,
      createdAt: null,
    };
  }
  const created = data.createdAt;
  return {
    id: snapshot.id,
    title: data.title || "",
    slug: data.slug || snapshot.id,
    excerpt: data.excerpt || "",
    content: data.content || "",
    coverImage: data.coverImage || "",
    galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
    published: !!data.published,
    createdAt: created?.toDate?.() ?? null,
  };
}

/**
 * All published posts, newest first. Uses the same `orderBy` as the admin list
 * and filters `published` client-side to avoid an extra Firestore composite index.
 */
export async function getPublishedBlogs(): Promise<PublicBlogPost[]> {
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(mapBlogDoc)
    .filter((post) => post.published && post.title);
}

/** Resolve by slug, or by document id as a fallback for older posts. */
export async function getPublishedBlogBySlug(
  slug: string
): Promise<PublicBlogPost | null> {
  const key = decodeURIComponent(slug).trim();
  if (!key) return null;

  const bySlug = query(
    collection(db, "blogs"),
    where("slug", "==", key),
    limit(1)
  );
  const slugSnap = await getDocs(bySlug);
  if (!slugSnap.empty) {
    const post = mapBlogDoc(slugSnap.docs[0]);
    return post.published ? post : null;
  }

  const docRef = doc(db, "blogs", key);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const post = mapBlogDoc(docSnap);
    return post.published ? post : null;
  }

  return null;
}

export function blogHref(post: Pick<PublicBlogPost, "slug" | "id">): string {
  const segment = post.slug || post.id;
  return `/blog/${encodeURIComponent(segment)}`;
}
