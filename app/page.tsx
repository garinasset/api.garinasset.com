'use client'

import { useEffect, useState } from 'react'

interface TerminalLink {
  label: string
  href: string
}

interface TerminalLine {
  type: 'command' | 'text' | 'api' | 'prompt'
  text?: string
  links?: TerminalLink[]
}

const lines: TerminalLine[] = [
  {
    type: 'command',
    text: '我是谁?',
  },
  {
    type: 'text',
    text: 'API 目录 - 嘉林数据 .',
  },
  {
    type: 'text',
    text: '',
  },
  {
    type: 'text',
    text: '我们已经做的和正在做的 :',
  },
  {
    type: 'api',
    text: '✅ IP 地理',
    links: [
      {
        label: 'API',
        href: 'https://api.garinasset.com/ip/redoc',
      },
      {
        label: '官方应用',
        href: 'https://ip.garinasset.com',
      },
    ],
  },
  {
    type: 'api',
    text: '❇️ 厘查',
    links: [
      {
        label: 'API',
        href: '#',
      },
      {
        label: '官方应用',
        href: 'https://leak-check.garinasset.com',
      },
    ],
  },
  {
    type: 'api',
    text: '❇️ 沿线新鲜事',
    links: [
      {
        label: 'API',
        href: '#',
      },
      {
        label: '官方应用',
        href: 'https://line.garinasset.com',
      },
    ],
  },
  {
    type: 'text',
    text: '',
  },
  {
    type: 'text',
    text: '未来我们还会做更多伟大的事情 .',
  },
  {
    type: 'prompt',
  },
]

function Prompt() {
  return (
    <span className="terminal-prompt">
      <span className="terminal-user-at-host">
        api@garinasset.com
      </span>

      <span className="terminal-path">:~</span>

      <span className="terminal-symbol">$</span>
    </span>
  )
}

function TypewriterLine({
  line,
  onComplete,
}: {
  line: TerminalLine
  onComplete: () => void
}) {
  const [count, setCount] = useState(0)

  const text = line.text ?? ''
  const complete = count >= text.length

  useEffect(() => {
    if (complete) {
      const timer = setTimeout(
        onComplete,
        text === '' ? 100 : 180,
      )

      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setCount((value) => value + 1)
    }, 16)

    return () => clearTimeout(timer)
  }, [count, complete, onComplete, text])

  if (line.type === 'command') {
    return (
      <div>
        <Prompt />

        <span className="ml-2">
          {text.slice(0, count)}
        </span>
      </div>
    )
  }

  if (line.type === 'api') {
    return (
      <div>
        {text.slice(0, count)}

        {complete && line.links && (
          <span className="ml-3 inline-flex flex-wrap gap-x-4">
            {line.links.map((link) => {
              const available = link.href !== '#'

              if (!available) {
                return (
                  <span
                    key={link.label}
                    className="text-zinc-700"
                  >
                    [{link.label}]
                  </span>
                )
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-zinc-400
                    underline
                    underline-offset-4
                    transition-colors
                    hover:text-white
                  "
                >
                  [{link.label}]
                </a>
              )
            })}
          </span>
        )}
      </div>
    )
  }

  if (line.type === 'prompt') {
    return (
      <div>
        <Prompt />

        {' '}

        <span className="terminal-cursor" />
      </div>
    )
  }

  return <div>{text.slice(0, count)}</div>
}

export default function Home() {
  const [lineIndex, setLineIndex] = useState(0)

  const handleComplete = () => {
    setLineIndex((index) => index + 1)
  }

  return (
    <main
      className="
        min-h-screen
        bg-black
        font-mono
        text-sm
        leading-7
        text-zinc-300
        sm:text-base
      "
    >
      {/* 静态终端标题 */}
      <div className="px-5 pt-8 sm:px-8 sm:pt-10">
        <div
          className="
            text-center
            text-base
            font-bold
            tracking-[0.2em]
            text-white
            sm:text-lg
          "
        >
          api.garinasset.com
        </div>
      </div>

      {/* 静态全宽分割线 */}
      <div className="mt-4 h-px w-full bg-zinc-800" />

      {/* 终端输出 */}
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
        {lines.slice(0, lineIndex + 1).map((line, index) => (
          <TypewriterLine
            key={index}
            line={line}
            onComplete={
              index === lineIndex
                ? handleComplete
                : () => {}
            }
          />
        ))}
      </div>
    </main>
  )
}