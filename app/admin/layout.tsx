export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#EFE4DB] text-black font-inter">
      <nav className="border-b border-black/10 bg-[#EFE4DB]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="apris text-2xl tracking-tight uppercase">Fola PR Admin</h1>
            <span className="text-xs px-2 py-1 rounded bg-black text-white font-medium uppercase tracking-wider">Dashboard</span>
          </div>
          <div className="flex gap-4 items-center">
            {/* Nav links to external/index could go here */}
            <a href="/" className="text-sm border-b border-black/30 hover:border-black transition-colors pb-0.5">Back to Site</a>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-[1400px] px-6 py-10">
        {children}
      </main>
    </div>
  );
}
