import Head from 'next/head'
import AuthorCard from '../components/Cards/AuthorCard'
import DatasetCard from '../components/Cards/DatasetCard'
import DownloadCard from '../components/Cards/DownloadCard'
import GithubCard from '../components/Cards/GithubCard'

export default function Home() {
  return (
    <div className='bg-teal-800 min-h-screen font-mono text-teal-50'>
      <Head>
        <title>Informations</title>
        <meta name="description" content="ASL Letters - Informations" />
      </Head>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pt-8">
				<DownloadCard/>
				<DatasetCard/>
				<GithubCard/>
				<AuthorCard/>
			</div>
    </div>
  )
}
