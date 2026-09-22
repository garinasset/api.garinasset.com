import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'API 目录 - 嘉林数据',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}