// ──────────────────────────────────────────────
// UnderDevelopment — Placeholder shown for pages not yet built
// ──────────────────────────────────────────────
export function UnderDevelopment({ pageName }) {
  return (
    <div className="page-enter flex flex-col items-center justify-center h-full min-h-[400px] space-y-4">
      <div className="text-6xl">🚧</div>
      <h2 className="text-xl font-extrabold text-[#1a2e25]">Page Under Development</h2>
      <p className="text-sm text-gray-400">
        {pageName ? `The "${pageName}" page is coming soon.` : 'This page is coming soon.'}
      </p>
    </div>
  )
}
