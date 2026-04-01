"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { getPublishedBlogBySlug } from "@/lib/blogs";
import type { PublicBlogPost } from "@/types/blog";

const articleBodyClass = [
  "blog-article min-w-0 max-w-full overflow-x-hidden break-words font-inter text-[15px] leading-[1.75] text-neutral-800 sm:text-[16px]",
  "[&_p]:mb-5",
  "[&_h2]:apris [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:max-w-full [&_h2]:break-words [&_h2]:text-[1.75rem] [&_h2]:font-normal [&_h2]:tracking-wide [&_h2]:text-neutral-900",
  "[&_ul]:mb-5 [&_ul]:max-w-full [&_ul]:list-disc [&_ul]:pl-6",
  "[&_ol]:mb-5 [&_ol]:max-w-full [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_a]:break-words [&_a]:font-medium [&_a]:text-neutral-900 [&_a]:underline [&_a]:underline-offset-2",
  "[&_strong]:font-semibold [&_strong]:text-neutral-900",
  "[&_img]:my-6 [&_img]:h-auto [&_img]:max-h-[min(85vh,720px)] [&_img]:w-full [&_img]:max-w-full [&_img]:object-contain",
  "[&_video]:my-6 [&_video]:h-auto [&_video]:max-w-full",
  "[&_iframe]:my-6 [&_iframe]:max-h-[min(80vh,560px)] [&_iframe]:w-full [&_iframe]:max-w-full",
  "[&_pre]:my-6 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:break-normal",
  "[&_table]:my-6 [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto",
].join(" ");

export default function BlogDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const [post, setPost] = useState<PublicBlogPost | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const found = await getPublishedBlogBySlug(slug);
        if (!cancelled) setPost(found);
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError("Could not load this story.");
          setPost(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <Layout>
      <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-[#EFE4DB] pt-[280px] text-black lg:pt-[320px]">
        {post === undefined ? (
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-40 bg-neutral-200" />
              <div className="aspect-video w-full bg-neutral-200" />
              <div className="h-4 w-full bg-neutral-100" />
              <div className="h-4 w-full bg-neutral-100" />
              <div className="h-4 w-2/3 bg-neutral-100" />
            </div>
          </div>
        ) : error || !post ? (
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
            <p className="font-inter text-neutral-700">
              {error || "This story doesn’t exist or is no longer published."}
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-block font-inter text-sm font-medium uppercase tracking-wider text-neutral-900 underline underline-offset-4"
            >
              ← Back to Archive
            </Link>
          </div>
        ) : (
          <article className="mx-auto w-full min-w-0 max-w-[800px] overflow-x-hidden px-5 pb-20 sm:px-8 lg:px-10">
            <Link
              href="/blog"
              className="inline-block font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900"
            >
              Archive
            </Link>
            <p className="mt-6 font-inter text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:text-[11px]">
              FOLA PR
            </p>
            <h1 className="apris mt-3 max-w-full break-words text-[clamp(1.75rem,4vw,2.75rem)] font-normal uppercase leading-[1.15] tracking-[0.03em] text-neutral-900">
              {post.title}
            </h1>
            {post.createdAt ? (
              <p className="mt-4 font-inter text-sm text-neutral-500">
                {post.createdAt.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : null}
            {post.excerpt ? (
              <p className="mt-8 max-w-full break-words font-inter text-[1rem] leading-[1.6] text-neutral-600 sm:text-lg">
                {post.excerpt}
              </p>
            ) : null}

            {post.coverImage ? (
              <div className="mt-10 w-full max-w-full overflow-hidden bg-neutral-100">
                <img
                  src={post.coverImage}
                  alt=""
                  className="max-h-[min(70vh,640px)] w-full max-w-full object-cover"
                />
              </div>
            ) : null}

            {post.content ? (
              <div
                className={`${articleBodyClass} mt-12`}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="mt-12 font-inter text-neutral-500">
                No body content.
              </p>
            )}

            {post.galleryImages.length > 0 ? (
              <div className="mt-16 border-t border-neutral-200 pt-12">
                <p className="apris text-lg uppercase tracking-[0.12em] text-neutral-900">
                  Gallery
                </p>
                <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                  {post.galleryImages.map((url, i) => (
                    <div
                      key={`${url}-${i}`}
                      className="min-w-0 overflow-hidden bg-neutral-100"
                    >
                      <img
                        src={url}
                        alt=""
                        className="aspect-square w-full object-cover max-h-[min(80vh,560px)]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-16 border-t border-neutral-200 pt-10">
              <Link
                href="/blog"
                className="inline-flex items-center font-inter text-sm font-medium uppercase tracking-[0.12em] text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
              >
                ← All stories
              </Link>
            </div>
          </article>
        )}
        <Footer />
      </div>
    </Layout>
  );
}
