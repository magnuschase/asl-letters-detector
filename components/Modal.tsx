
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type ModalPayload = {
	children: React.ReactNode,
	visible: boolean,
	setVisible: (v: boolean) => void
}

const Modal: React.FC<ModalPayload> = ({children, visible, setVisible}) =>
	<AnimatePresence>
		{visible && (
			<motion.div
				key="modal"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1, transition: { duration: 1.125 } }}
				exit={{ scale: 0, opacity: 0, transition: { duration: 1.125 } }}
				className={`
					fixed z-10 inset-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center
				`}
				onClick={() => setVisible(false)}
			>
				<div 
					className={`
						bg-emerald-900 rounded-lg grid grid-cols-1 overflow-hidden w-1/3 gap-4
						aspect-square relative px-6 py-6
					`}
					onClick={(e) => e.stopPropagation()}
				>
					<motion.button 
						className={`
							z-30 absolute top-4 right-4 text-xl text-emerald-700
						`} 
						onClick={() => {
							setVisible(!visible)
						}}
					>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							width="36"
							height="36"
							viewBox="0 0 24 24"
							fill="currentColor"
							whileHover={{ scale: 0.8, transition: { duration: 2 } }}>
								<path d="M20.197 2.837l.867.867-8.21 8.291 8.308 8.202-.866.867-8.292-8.21-8.23 8.311-.84-.84 8.213-8.32-8.312-8.231.84-.84 8.319 8.212 8.203-8.309zm-.009-2.837l-8.212 8.318-8.31-8.204-3.666 3.667 8.321 8.24-8.207 8.313 3.667 3.666 8.237-8.318 8.285 8.204 3.697-3.698-8.315-8.209 8.201-8.282-3.698-3.697z" />
						</motion.svg>
					</motion.button>
					{children}
				</div>
			</motion.div>
		)}
	</AnimatePresence>


export default Modal