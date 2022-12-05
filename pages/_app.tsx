import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import Nav from '../components/Nav'

export default function App({ Component, pageProps }: AppProps) {
  return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Nav />
			<AnimatePresence
				exitBeforeEnter
				initial={false}
				onExitComplete={() => window.scrollTo(0, 0)}
			>
				<Component {...pageProps} />
			</AnimatePresence>
		</>
	)
}