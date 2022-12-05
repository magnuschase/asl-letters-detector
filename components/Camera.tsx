import React, { useEffect, useRef, useState, useMemo } from 'react'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam';
import { generateColor } from '../helpers/colors';

const weights = '/300epochs/model.json'

const Camera = () => {
	const webcamRef = useRef<Webcam>(null)
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [model, setModel] = useState<tf.GraphModel<string | tf.io.IOHandler>>()
	const [loading, setLoading] = useState(false)

	const names = useMemo(() => {
		const alpha = Array.from(Array(26)).map((e, i) => i + 65)
		return alpha.map((x) => String.fromCharCode(x))
	}, [])

	const colorForName = useMemo(() => {
		return names.map((str) => generateColor({str}))
	}, [names])

	const convertVideoToTensor = (img: HTMLVideoElement): tf.Tensor => {
		if (!model) throw new Error('Model not loaded')
		const [modelWidth, modelHeight] = model.inputs[0].shape?.slice(1, 3) as number[]
		const batched = tf.tidy(() =>
			tf.image
				.resizeBilinear(tf.browser.fromPixels(img), [modelWidth, modelHeight])
				.div(255.0)
				.expandDims(0)
		)
		return batched
	}

	const detect = async () => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current &&
			webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
			canvasRef.current && 
			model
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
			const img = convertVideoToTensor(video)
      const data = await model.executeAsync(img) as tf.Tensor[]
			const [boxes, scores, classes, valid_detections] = data
			
      // Draw mesh
			if (!canvasRef || !canvasRef.current) return
      const ctx = canvasRef.current.getContext("2d");
			const font = "16px sans-serif";
			if (!ctx) throw new Error('Context for canvas not found')
      ctx.font = font;
      ctx.textBaseline = "top";

      const boxes_data = boxes.dataSync();
      const scores_data = scores.dataSync();
      const classes_data = classes.dataSync();
      const valid_detections_data = valid_detections.dataSync()[0]

			// Get rid of the tensors to free up memory
			tf.dispose(data)

			let i;
      for (i = 0; i < valid_detections_data; ++i){
        let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4) as unknown as number[]
        x1 *= 640;
        x2 *= 640;
        y1 *= 480;
        y2 *= 480;
        const width = x2 - x1;
        const height = y2 - y1;
				const classIndex = classes_data[i]
        const className = names[classIndex];
        const score = scores_data[i].toFixed(2);

				const colorHex = colorForName[classIndex]
        // Draw the bounding box.
        ctx.strokeStyle = colorHex;
        ctx.lineWidth = 4;
        ctx.strokeRect(x1, y1, width, height);

        // Draw the label background.
        ctx.fillStyle = colorHex;
        const textWidth = ctx.measureText(className + ":" + score).width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x1, y1, textWidth + 4, textHeight + 4);
      }

      for (i = 0; i < valid_detections_data; ++i){
        let [x1, y1] = boxes_data.slice(i * 4, (i + 1) * 4) as unknown as number[]
        x1 *= 640;
        y1 *= 480;
        const klass = names[classes_data[i]];
        const score = scores_data[i].toFixed(2);

        // Draw the text last to ensure it's on top.
        ctx.fillStyle = "#000000";
        ctx.fillText(klass + ":" + score, x1, y1);

      }
    }
  };

	useEffect(() => {
		if (model || loading) return
		setLoading(true)
		tf.loadGraphModel(weights)
			.then((data) => {
				setModel(data)
				setLoading(false)
			})
	}, [])


	
	useEffect(() => {
		if (!model) return
		setInterval(() => {
			detect()
		}, 10)
	}, [model])

	return (
		<>
			<Webcam 
				ref={webcamRef}
				muted={true}
				className='absolute mx-auto left-0 right-0 text-center z-5'
				style={{
					width: 640,
					height: 480
				}}
			/>
			<canvas 
				ref={canvasRef}
				className='absolute mx-auto left-0 right-0 text-center z-10'
				style={{
					width: 640,
					height: 480
				}}
			/>
		</>
	)
}

export default Camera