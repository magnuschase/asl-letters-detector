import React from 'react'
import Card from '../Card'

const GithubCard = () => {
	return (
		<Card link="https://github.com/magnuschase/asl-letters-detector">
			<div className="grid grid-cols-1 gap-4">
				GitHub
				<div className="text-sm">
					Visit the GitHub repository for this project.
				</div>
			</div>
		</Card>
	)
}

export default GithubCard