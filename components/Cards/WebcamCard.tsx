import React from 'react'
import Card from '../Card'

const WebcamCard = () => {
	return (
		<Card link="/camera">
			<div className="grid grid-cols-1 gap-4">
				Webcam
				<div className="text-sm">
					As of now, TensorflowJS is pretty unstable for live detection. Thus, this option may be laggy and memory-leaking. Use responsibly. 
				</div>
			</div>
		</Card>
	)
}

export default WebcamCard