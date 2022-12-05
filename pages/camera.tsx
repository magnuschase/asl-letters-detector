import Head from 'next/head'
import Camera from '../components/Camera'
export default function Home() {
  return (
    <div className='bg-teal-800 min-h-screen font-mono text-teal-50'>
      <Head>
        <title>ASL Webcam</title>
        <meta name="description" content="ASL Letters - Webcam" />
      </Head>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pt-8">
				<Camera/>
			</div>
    </div>
  )
}
