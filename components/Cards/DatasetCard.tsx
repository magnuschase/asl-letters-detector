import React from 'react'
import Card from '../Card'

const DatasetCard = () => {
	return (
		<Card link="https://public.roboflow.com/object-detection/american-sign-language-letters">
			<div className="grid grid-cols-1 gap-4">
				Dataset
				<div className="text-sm">
					Grab the dataset straight from the source.
				</div>
			</div>
		</Card>
	)
}

export default DatasetCard