import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
    </SessionProvider>
  )
}
