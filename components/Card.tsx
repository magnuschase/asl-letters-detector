import React from 'react'
import Link from 'next/link'

const Card = ({
	children,
	link
}: {
	children: React.ReactNode,
	link: string
}) => {
	return (
		<Link href={link}>
			<div 
				className={`
					p-8 bg-emerald-900 aspect-[2/1] flex items-start justify-start lg:text-5xl
					rounded-lg shadow-xl shadow-emerald-900 transition-all hover:shadow-emerald-700
					hover:shadow-2xl hover:bg-emerald-800 text-emerald-500 font-bold text-3xl
				`}
			>
				{children}
			</div>
		</Link>
	)
}

export default Card