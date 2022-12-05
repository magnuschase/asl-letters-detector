import React from 'react'
import Card from '../Card'

const InformationCard = () => {
	return (
		<Card link="/info">
			<div className="grid grid-cols-1 gap-4">
				<span className="text-ellipsis whitespace-nowrap overflow-hidden">Information</span>
				<div className="text-sm">
					Learn more about this app.
				</div>
			</div>
		</Card>
	)
}

export default InformationCard