import Head from 'next/head'
import Image from 'next/image'
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
			<div className="flex flex-wrap flex-col gap-4 p-8">

				<h1 className="text-5xl border-b-2 pb-4 border-emerald-700 w-full font-bold text-emerald-300">What is ASL?</h1>
				<span className="text-xs md:text-base">
					ASL stands for American Sign Language. It is a visual language used by deaf and hard of hearing people in the United States and Canada. 
					ASL uses hand gestures, body language, and facial expressions to convey meaning, rather than sound. 
					It is a complete and complex language, with its own grammar, syntax, and vocabulary. It is not a universal language and is not related to spoken English, 
					although some words and phrases may be similar.
				</span>
				<span className="font-bold text-emerald-400 text-sm">
					Unfortunately, training a model capable of detecting entirety of ASL would require a massive dataset & processing power, as it&apos;s a very complex language.
				</span>

				<h1 className="text-2xl md:text-5xl border-b-2 pb-4 border-emerald-700 w-full mt-12 font-bold text-emerald-300">Dataset</h1>
				<span className="text-xs md:text-base">
					This project uses dataset made by a data scientist David Lee, which contains 1728 images of ASL Letters augmented in different ways. 
					Let&apos;s don&apos;t be fooled by this number - this is far too little data to create a completely accurate prediction, and letters don&apos;t have a lot of usage in this language. 
					However, this demonstrates what this technology is capable of.
				</span>
				<span className="font-semibold text-emerald-400">Letters available in the dataset:</span>
				<div className="aspect-square w-full md:w-1/2 lg:w-1/3 relative">
					<Image src="/asl.webp" alt="ALS Alphabet" fill/>
				</div>

				<h1 className="text-2xl md:text-5xl border-b-2 pb-4 border-emerald-700 w-full mt-12 font-bold text-emerald-300">Training</h1>
				<span className="text-xs md:text-base">
					For training, I decided to use the same state-of-the-art base model as David Lee - YOLOv5 made by Ultralytics. 
					It&apos;s the world most loved vision AI, and is fairly easy to use. Unfortunately, it doesn&apos;t support training models using Apple Silicon GPU. 
					That made the process pretty complicated, as I use Apple M1 processor. Training locally proved to be very slow, so I tried to use Tensorflow Object Detection API, 
					but that came with a bunch of more issues. 
					After struggling with it for countless hours, I decided to train the model using Google Colab, which provides free access to powerful machines with Tesla T4 GPU.
				</span>
				<span className="font-semibold text-emerald-400 text-sm">
					The model was trained for 300 epochs, and evaluated at around 95% accuracy. 
					However, a few of the letters proved to be problematic - the V is easily mistaken with W, and it&apos;s the same case for the U-B pair. 
					Also, Z letter is pretty hard to recognize, as it relies on hand movement.
				</span>

				<h1 className="text-2xl md:text-5xl border-b-2 pb-4 border-emerald-700 w-full mt-12 font-bold text-emerald-300">Exporting</h1>
				<span className="text-xs md:text-base">
					The final model was exported to TFLite and TFJS. However, the model lost a little bit of accuracy during those exports. 
					That&apos;s why i recommend to use the original, PyTorch model, which we unfortunately can&apos;t use on the web (you can use it on mobile devices though, thanks to PlayTorch)
				</span>

				<h1 className="text-2xl md:text-5xl border-b-2 pb-4 border-emerald-700 w-full mt-12 font-bold text-emerald-300">Implementing the model in React</h1>
				<span className="text-xs md:text-base">
					Tensorflow JS turned to be pretty unreliable when it comes to using it with object detection on the web. 
					It especially strugles in case of live detection, such as using it with webcam. 
					After a while, it creates memory leaks, which can&apos;t be really fixed when pairing it with React. It works OK in case of single file evaluation though.
				</span>
				<span className="font-semibold text-emerald-400 text-sm">
					I&apos;d recommend using WebAssembly (Wasm) for that purpose. However, it doesn&apos;t work that great with React, and that&apos;s the reason it isn&apos;t available in this project.
				</span>
				<span className="text-xs md:text-base">
					Moving forward, it&apos;s good to remember that the TFLite model works generally better than the TFJS one, and we can use it in React Native for mobile applications. 
					Also, there is PlayTorch which allows use to use PyTorch models in React Native, so that would probably be my first choice.
				</span>

				<h1 className="text-2xl md:text-5xl border-b-2 pb-4 border-emerald-700 w-full mt-12 font-bold text-emerald-300">Additional resources</h1>

			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-8 pb-16">
				<DownloadCard/>
				<DatasetCard/>
				<GithubCard/>
				<AuthorCard/>
			</div>
    </div>
  )
}
