import React from 'react'
import Card from '../Card'

const AuthorCard = () => {
	return (
		<Card link="https://kapala.xyz">
			<div className="grid grid-cols-1 gap-4">
				Author
				<div className="text-sm">
					Visit my own website :)
				</div>
			</div>
		</Card>
	)
}

export default AuthorCard