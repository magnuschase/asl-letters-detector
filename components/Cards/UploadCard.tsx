import React from 'react'
import Card from '../Card'

const UploadCard = () => {
	return (
		<Card link="/upload">
			<div className="grid grid-cols-1 gap-4">
				File upload
				<div className="text-sm">
					As of now, most stable option of using this app inside your browser.
				</div>
			</div>
		</Card>
	)
}

export default UploadCard