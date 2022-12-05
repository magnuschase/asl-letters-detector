import React from 'react'
import { AnimatePresence, motion, useCycle } from "framer-motion"

type ButtonPayload = {
	href: string,
	children: React.ReactNode,
	icon?: React.ReactNode
}

const Button: React.FC<ButtonPayload> = ({
	children,
	icon,
	href
}) => {
	return (
		<a target="_blank" rel="noopener noreferrer" href={href} download>
			<motion.div 
				className="px-12 flex items-center justify-center bg-emerald-50 py-4 mb-4 rounded-lg
					hover:bg-emerald-100 cursor-pointer select-none shadow-lg
					shadow-emerald-700/50 hover:shadow-emerald-600/50 relative
				"
				whileHover={{scale: .95}}
			>
				<div className="w-6 h-6 absolute left-4">
					{icon}
				</div>
				<div className="text-2xl text-emerald-700 text-center">
					{children}
				</div>
			</motion.div>
		</a>
	)
}

export default Button