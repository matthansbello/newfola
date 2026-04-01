import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive — FOLA PR",
  description:
    "Stories, insights, and publications from FOLA PR — elevating African creativity to the global stage.",
};

export default function BlogSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
