import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

const Card = ({
	children,
	link,
	onClick
}: {
	children: React.ReactNode,
	link?: string
	onClick?: () => void
}) => {
	const router = useRouter()

	const handler = useCallback(() => {
		if (link) {
			router.push(link)
			return
		}
		if (!onClick) return
		onClick()
		return
	}, [link, onClick, router])

	return (
			<div 
				className={`
					p-8 bg-emerald-900 aspect-[2/1] flex items-start justify-start lg:text-5xl
					rounded-lg shadow-xl shadow-emerald-900 transition-all hover:shadow-emerald-700
					hover:shadow-2xl hover:bg-emerald-800 text-emerald-500 font-bold text-3xl select-none
					cursor-pointer
				`}
				onClick={handler}
			>
				{children}
			</div>
	)
}

export default Card