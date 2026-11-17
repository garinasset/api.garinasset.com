interface TerminalLink {
  label: string
  href: string
}

interface TerminalLine {
  type: 'command' | 'text' | 'api' | 'contact' | 'prompt'
  text?: string
  links?: TerminalLink[]
}

const TYPING_SPEED_MS = 16

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
    text: '✅ 道岔 DNS',
    links: [
      {
        label: 'CLI',
        href: 'https://github.com/garinasset/updns',
      },
      {
        label: '官方应用',
        href: 'https://downloads.garinasset.com/updns/',
      },
    ],
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
    type: 'api',
    text: '❇️ 洞见',
    links: [
      {
        label: 'API',
        href: '#',
      },
      {
        label: '官方应用',
        href: '#',
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
    type: 'contact',
    text: '✉️ ',
    links: [
      {
        label: '联系我们',
        href: 'mailto:contact@garinasset.com?subject=API 目录',
      },
    ],
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

function TerminalLineView({ line }: { line: TerminalLine }) {
  const text = line.text ?? ''

  if (line.type === 'command') {
    return (
      <div>
        <Prompt />

        <span className="ml-2">
          {text}
        </span>
      </div>
    )
  }

  if (line.type === 'api') {
    return (
      <div>
        {text}

        {line.links && (
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

  if (line.type === 'contact') {
    return (
      <div>
        {text}

        {line.links && (
          <span className="ml-0">
            {line.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  text-zinc-400
                  underline
                  underline-offset-4
                  transition-colors
                  hover:text-white
                "
              >
                {link.label}
              </a>
            ))}
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

  return <div>{text}</div>
}

export function Terminal() {
  return (
    <section className="font-mono text-sm leading-7 text-zinc-300 sm:text-base">
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
        {lines.map((line, index) => {
          const delay = lines
            .slice(0, index)
            .reduce((total, previousLine) => {
              const previousText = previousLine.text ?? ''

              return total + previousText.length * TYPING_SPEED_MS
            }, 0)
          const textLength = line.text?.length ?? 0
          const duration = textLength * TYPING_SPEED_MS
          const steps = Math.max(textLength, 1)

          return (
            <div
              key={index}
              className="terminal-line"
              style={{
                animation: `terminal-typewriter ${duration}ms steps(${steps}, end) ${delay}ms both`,
              }}
            >
              <TerminalLineView line={line} />
            </div>
          )
        })}
      </div>
    </section>
  )
}