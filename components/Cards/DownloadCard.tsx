import React, { useState } from 'react'
import Card from '../Card'
import Modal from '../Modal'
import PyTorch from '../icons/PyTorch'
import Button from '../ButtonLink'
import Tensorflow from '../icons/Tensorflow'
import DocumentIcon from '../icons/Document'

const DownloadCard = () => {
	const [visible, setVisible] = useState(false)

	return (
		<>
			<Card onClick={() => setVisible(true)}>
				<div className="grid grid-cols-1 gap-4">
					Download
					<div className="text-sm">
						Get this model in PyTorch/TFJS/TFLite format, and run detections using your own code.
					</div>
				</div>
			</Card>
			<Modal
					visible={visible}
					setVisible={setVisible}
				>
					<Button
						href='/300epochs/best300.pt'
						icon={<PyTorch/>}
					>
						PyTorch
					</Button>
					<Button
						href='/300epochs/best300-fp16.tflite'
						icon={<Tensorflow/>}
					>
						TFLite
					</Button>
					<Button
						href='/300epochs/model.json'
						icon={<Tensorflow/>}
					>
						TFJS
					</Button>
					<Button
						href='/300epochs/labels.txt'
						icon={<DocumentIcon/>}
					>
						Labels
					</Button>
					
					<span>
						If you want to test the model locally with your webcam,
						<a 
							href="https://github.com/ultralytics/yolov5"
							className="px-2 text-emerald-300 hover:text-emerald-400"
						>
							YOLOv5
						</a>
						includes a great
						<a
							href="https://github.com/ultralytics/yolov5/blob/master/detect.py"
							className="px-2 text-emerald-300 hover:text-emerald-400"
						>
							script
							</a>
						for that
					</span>
			</Modal>
		</>
	)
}

export default DownloadCard