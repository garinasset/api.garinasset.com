export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="h-px w-full bg-zinc-800" />

      <div
        className="
          mx-auto
          max-w-5xl
          px-5
          py-6
          font-mono
          text-xs
          text-zinc-500
          sm:px-8
          sm:py-8
          sm:text-sm
        "
      >
        © 2022 - {new Date().getFullYear()} 嘉林数据, 保留所有权利。
      </div>
    </footer>
  )
}