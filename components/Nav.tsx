import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Nav = () => {
	return (
		<nav className="flex items-center justify-center py-12 px-10 w-screen
		bg-teal-800 font-mono text-teal-50
		">
			<Link href="/">
				<motion.div whileHover={{ scale: 1.2, y: '12px' }} className='text-5xl font-thin flex select-none cursor-pointer text-teal-500'>
					<h3>{`{ ASL }`}</h3>
				</motion.div>
			</Link>
		</nav>
	)
}

export default Nav