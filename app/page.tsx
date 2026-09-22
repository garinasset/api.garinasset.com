import { SiteFooter } from './components/site-footer'
import { Terminal } from './components/terminal'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <div className="flex-1">
        <Terminal />
      </div>

      <SiteFooter />
    </main>
  )
}