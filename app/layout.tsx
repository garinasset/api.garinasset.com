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
      <head>
        <meta name="apple-mobile-web-app-title" content="API 目录" />
      </head>
      <body>{children}</body>
    </html>
  )
}