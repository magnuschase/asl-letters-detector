import Head from 'next/head'
import { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import * as tf from '@tensorflow/tfjs'
import { useDropzone } from 'react-dropzone'
import { generateColor } from '../helpers/colors';

const weights = '/300epochs/model.json'

export default function Home() {
	const [model, setModel] = useState<tf.GraphModel<string | tf.io.IOHandler>>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [preview, setPreview] = useState<string>('')
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [canvasDim, setCanvasDim] = useState('640')

	const names = useMemo(() => {
		const alpha = Array.from(Array(26)).map((e, i) => i + 65)
		return alpha.map((x) => String.fromCharCode(x))
	}, [])

	const colorForName = useMemo(() => {
		return names.map((str) => generateColor({str}))
	}, [names])

	// Crop image provided by user to canvas size (640x640)
	const cropToCanvas = (image: any, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const ratio = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const newWidth = Math.round(naturalWidth * ratio);
    const newHeight = Math.round(naturalHeight * ratio);
    ctx.drawImage(
      image,
      0,
      0,
      naturalWidth,
      naturalHeight,
      (canvas.width - newWidth) / 2,
      (canvas.height - newHeight) / 2,
      newWidth,
      newHeight,
    );

  }

	// Callback for image change
	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (!acceptedFiles || !acceptedFiles.length) return
		setPreview(URL.createObjectURL(acceptedFiles[0]))
	}, [])

	const onImageChange = useCallback(async (e) => {
		if (!canvasRef || !canvasRef.current || !model) return

		const ctx = canvasRef.current.getContext('2d')

		if (!ctx) return

		// Tidy up the image
    const [modelWidth, modelHeight] = model.inputs[0].shape?.slice(1, 3) as number[]
		cropToCanvas(e.target, canvasRef.current, ctx)
		const input = tf.tidy(() => {
      return tf.image.resizeBilinear(tf.browser.fromPixels(canvasRef.current), [modelWidth, modelHeight])
        .div(255.0).expandDims(0);
    })

		// Evaluate the model
		const data = await model.executeAsync(input) as tf.Tensor[]
		const [boxes, scores, classes, valid_detections] = data
		const font = "16px sans-serif";
		ctx.font = font;
		ctx.textBaseline = "top";

		const boxes_data = boxes.dataSync();
		const scores_data = scores.dataSync();
		const classes_data = classes.dataSync();
		const valid_detections_data = valid_detections.dataSync()[0];

		// Dispose the Tensor to free up memory
    tf.dispose(data)

		// Draw the detected objects
		let i;
		for (i = 0; i < valid_detections_data; ++i){
			let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4) as unknown as number[]
			x1 *= canvasRef.current.width;
			x2 *= canvasRef.current.width;
			y1 *= canvasRef.current.height;
			y2 *= canvasRef.current.height;
			const width = x2 - x1;
			const height = y2 - y1;
			const klass = names[classes_data[i]];
			const score = scores_data[i].toFixed(2);
			const colorHex = colorForName[classes_data[i]]

			// Draw the bounding box.
			ctx.strokeStyle = colorHex;
			ctx.lineWidth = 4;
			ctx.strokeRect(x1, y1, width, height);

			// Draw the label background.
			ctx.fillStyle = colorHex;
			const textWidth = ctx.measureText(klass + ":" + score).width;
			const textHeight = parseInt(font, 10); // base 10
			ctx.fillRect(x1, y1, textWidth + 4, textHeight + 4);

		}
		for (i = 0; i < valid_detections_data; ++i){
			let [x1, y1 ] = boxes_data.slice(i * 4, (i + 1) * 4) as unknown as number[]
			x1 *= canvasRef.current.width;
			y1 *= canvasRef.current.height;
			const klass = names[classes_data[i]];
			const score = scores_data[i].toFixed(2);

			// Draw the text last to ensure it's on top.
			ctx.fillStyle = "#000000";
			ctx.fillText(klass + ":" + score, x1, y1);

		}
    
	}, [model, names])

	useEffect(() => {
		if (model || isLoading) return
		setIsLoading(true)
		tf.loadGraphModel(weights)
			.then((data) => {
				setModel(data)
				setIsLoading(false)
			})
	}, [])

	window.addEventListener('resize', () => {
		if (window.innerWidth > 640) {
			setCanvasDim('640')
			return
		}
		setCanvasDim('320')
	})

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
		onDrop, 
		accept: {
			"image/jpeg": [".jpg", ".jpeg"],
			"image/png": [".png"]
		},
		maxFiles: 1
	})

  return (
    <div className='bg-teal-800 min-h-screen font-mono text-teal-50'>
      <Head>
        <title>ASL File Dropdown</title>
        <meta name="description" content="ASL Letters - Dropdown" />
      </Head>

			<div className="w-screen gap-8 px-8 py-8 flex items-center justify-center">
				
				<div
					className="w-[320px] h-[320px] md:w-[640px] md:h-[640px] flex items-center justify-center 
						bg-emerald-900 cursor-pointer rounded-lg shadow-emerald-700/50
						shadow-2xl text-2xl relative
					"
					{...getRootProps()}
				>
					<input {...getInputProps()} />
					{
						isDragActive &&
							<div className="absolute z-20 inset-auto flex items-center justify-center
								bg-emerald-900/75 rounded-lg w-full h-full
							">
								Drop the files here ...
							</div> 
      		}
					{ !isDragActive && !preview && 
							<p className="text-center px-4">Drag your file here (or click to select!)</p>
					}

					{ preview && (
						<>
							<img
								src={preview}
								className="md:w-[640px] md:h-[640px] object-cover absolute inset-0 rounded-lg
									w-[320px] h-[320px]
								"
								alt=''
								onLoad={onImageChange}
							/>
            	<canvas ref={canvasRef} className="absolute inset-0 rounded-lg" width={canvasDim} height={canvasDim} />
						</>
					)}
					
				</div>
			</div>
    </div>
  )
}
