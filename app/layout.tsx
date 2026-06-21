import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Jamal Tour',
  description: 'Экскурсии в Аланье, Хургаде и Грузии',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="relative min-h-screen text-white">

        {/* BACKGROUND IMAGE */}
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/alanya-hero.jpg')",
          }}
        />

        {/* DARK OVERLAY */}
        <div className="fixed inset-0 -z-10 bg-black/30 pointer-events-none" />

        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* LOGO */}
            <div className="text-2xl font-bold text-yellow-400">
              Jamal Tour
            </div>

            {/* MENU */}
            <nav className="hidden md:flex items-center gap-8 text-white">

              <Link href="/" className="text-white hover:text-yellow-400 transition">
                Главная
              </Link>

              <Link href="/excursions" className="text-white hover:text-yellow-400 transition">
                Экскурсии
              </Link>

              <Link href="/turkey" className="text-white hover:text-yellow-400 transition">
                Турция
              </Link>

              <Link href="/egypt" className="text-white hover:text-yellow-400 transition">
                Египет
              </Link>

              <Link href="/georgia" className="text-white hover:text-yellow-400 transition">
                Грузия
              </Link>

              <Link href="/contacts" className="text-white hover:text-yellow-400 transition">
                Контакты
              </Link>

            </nav>

          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="pt-24 relative z-10 min-h-screen">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="relative z-10 border-t border-white/10 py-10 mt-20 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">

            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">
                Jamal Tour
              </div>
              <div className="text-gray-300">
                Экскурсии в Аланье, Хургаде и Грузии
              </div>
            </div>

            <div className="text-gray-300">
              WhatsApp • Instagram • Telegram
            </div>

          </div>
        </footer>

        {/* WHATSAPP BUTTON */}
        <a
          href="https://wa.me/905551112233"
          target="_blank"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-400 text-white px-6 py-4 rounded-full shadow-2xl font-semibold z-50 flex items-center gap-2"
        >
          💬 WhatsApp
        </a>

      </body>
    </html>
  )
}