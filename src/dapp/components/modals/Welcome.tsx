import React from 'react'
import Big from 'big.js'

import questionMark from '../../images/ui/expression_confused.png'
import sunflower from '../../images/sunflower/fruit.png'

import { secondsToLongString } from '../../utils/time'

import { Panel } from '../ui/Panel'
import { Button } from '../ui/Button'
import { service } from '../../machine'
import { getMarketRate } from '../../utils/supply'

interface Props {
	onGetStarted: () => void
}

// TODO: Hardcoded from reports, read from live API
const predictedDate = new Date(2021, 9, 19, 8, 44, 55)

const makeTimeLeft = () => {
	const difference = predictedDate.getTime() - Date.now()

	const display = secondsToLongString(difference / 1000)
	return display
}

export const Welcome: React.FC<Props> = ({ onGetStarted }) => {
	const [timeLeft, setTimeLeft] = React.useState(makeTimeLeft())
	const [totalSupply, setTotalSupply] = React.useState<number>(1)

	React.useEffect(() => {
		const interval = window.setInterval(() => {
			setTimeLeft(makeTimeLeft())
		}, 1000)

		return () => window.clearInterval(interval)
	}, [])

	React.useEffect(() => {
		const load = async () => {
			const supply = await service.machine.context.blockChain.totalSupply()
			setTotalSupply(supply)
		}

		load()
	}, [])

	const marketRate = getMarketRate(totalSupply)

	const sunflowerPrice = Big(0.01).div(marketRate)

	return (
		<Panel>
			<div id="welcome">
				<h1 className="header">Sunflower Farmers</h1>
				<Button onClick={onGetStarted}>
					<span>Get Started</span>
				</Button>
				<Button
					onClick={() =>
						window.open(
							'https://adamhannigan81.gitbook.io/sunflower-coin/'
						)
					}
				>
					About
					<img src={questionMark} id="question" />
				</Button>

				<div>			
					<div className="current-price-container ">
						<img className="sunflower-price" src={sunflower} />
						<span className="current-price">
							= {`$${sunflowerPrice}`}
						</span>
					</div>
					<a href="https://adamhannigan81.gitbook.io/sunflower-coin/#supply-and-demand">
						<h3 className="current-price-supply-demand">
							Read more about the supply & demand
						</h3>
					</a>
				</div>
			</div>
		</Panel>
	)
}
