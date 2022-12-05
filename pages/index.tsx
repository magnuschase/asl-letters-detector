import Head from 'next/head'
import DownloadCard from '../components/Cards/DownloadCard'
import GithubCard from '../components/Cards/GithubCard'
import AuthorCard from '../components/Cards/AuthorCard'
import WebcamCard from '../components/Cards/WebcamCard'
import UploadCard from '../components/Cards/UploadCard'
import InformationCard from '../components/Cards/InformationCard'

export default function Home() {
  return (
    <div className='bg-teal-800 min-h-screen font-mono text-teal-50'>
      <Head>
        <title>ASL Letters Recognition</title>
        <meta name="description" content="ASL Letters - Homepage" />
      </Head>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pt-8 pb-16">
				<WebcamCard/>
				<UploadCard/>
				<DownloadCard/>
				<InformationCard/>
				<GithubCard/>
				<AuthorCard/>
			</div>
    </div>
  )
}
