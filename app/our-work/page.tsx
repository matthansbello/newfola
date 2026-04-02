"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { getPublishedBlogs, blogHref } from "@/lib/blogs";
import type { PublicBlogPost } from "@/types/blog";

const CARD_TAG = "FOLA PR";

function BlogCard({ post }: { post: PublicBlogPost }) {
  const href = blogHref(post);
  const img = post.coverImage;

  return (
    <article className="group flex min-w-0 flex-col">
      <Link href={href} className="block min-w-0 overflow-hidden bg-neutral-100">
        <div className="aspect-[3/4] w-full overflow-hidden sm:aspect-[2/3]">
          {img ? (
            <img
              src={img}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-200 font-inter text-sm text-neutral-500">
              No cover
            </div>
          )}
        </div>
      </Link>
      <div className="mt-4 min-w-0 flex-1 sm:mt-3">
        <p className="m-0 font-inter text-[10px] font-normal uppercase tracking-[0.18em] text-neutral-500 sm:text-[11px]">
          {CARD_TAG}
        </p>
        <Link href={href} className="no-underline">
          <h2 className="mt-2 line-clamp-3 text-[12px] font-bold uppercase leading-[1.35] tracking-[0.04em] text-black transition-opacity group-hover:opacity-80 sm:text-[12px] sm:leading-snug md:text-[12px]">
            {post.title}
          </h2>
        </Link>
        {post.excerpt ? (
          <p className="mt-3 line-clamp-4 font-inter text-[11px] leading-[1.55] text-neutral-600 uppercase">
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default function OurWorkPage() {
  const [posts, setPosts] = useState<PublicBlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getPublishedBlogs();
        if (!cancelled) setPosts(list);
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError(
            "Unable to load stories. Check your connection or Firestore rules for public read access to the blogs collection."
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-[#EFE4DB] pt-[280px] text-black lg:pt-[320px]">
        <section className="mx-auto max-w-[1800px] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <header className="mb-12 sm:mb-16 lg:mb-20">
            <h1 className="apris m-0 text-[clamp(2.5rem,6vw,4.5rem)] font-medium uppercase tracking-[0.02em] text-neutral-900">
              Our work
            </h1>
          </header>

          {error ? (
            <p className="max-w-xl font-inter text-sm leading-relaxed text-red-800">
              {error}
            </p>
          ) : posts === null ? (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-neutral-200 sm:aspect-[2/3]" />
                  <div className="mt-4 h-3 w-16 bg-neutral-200" />
                  <div className="mt-3 h-6 w-4/5 max-w-md bg-neutral-200" />
                  <div className="mt-3 h-3 w-full bg-neutral-100" />
                  <div className="mt-2 h-3 w-full bg-neutral-100" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="font-inter text-neutral-600">
              No published posts yet. New stories will appear here soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-20">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
        <Footer />
      </div>
    </Layout>
  );
}
