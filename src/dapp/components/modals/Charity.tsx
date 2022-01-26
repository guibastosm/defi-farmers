import React from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import { useService } from '@xstate/react';
import { service, Context, BlockchainEvent, BlockchainState } from '../../machine'

import { Charity as Charities } from '../../types/contract'

import questionMark from '../../images/ui/expression_confused.png'

import { Button } from '../ui/Button'
import { Message } from '../ui/Message'
import { Panel } from '../ui/Panel'

import './Charity.css'
import { spawn } from 'xstate'

interface Props {
    onSelect: (charity: Charities) => void
}

export const Charity: React.FC<Props> = ({ onSelect }) => {
    const [machineState] = useService<
        Context,
        BlockchainEvent,
        BlockchainState
    >(service);

    const [balances, setBalances] = React.useState({
        coolEarthBalance: '',
        waterBalance: '',
        heiferBalance: '',
    })

    React.useEffect(() => {
        if (machineState.context.blockChain.isConnected) {
            const load = async () => {
                const balances = await machineState.context.blockChain.getCharityBalances()
                setBalances(balances)
            }
            load()
        }
    }, [machineState.context.blockChain, machineState.context.blockChain.isConnected])

    return (
        <Panel>
            <div id="charity-container">
                <span>
                    Donate to play.
                </span>
                <span id="donate-description">
                    To start a farm, please donate $0.05 BNB.
                </span>
                <div id="charities">
                    <div>
                        <div className="charity">
                            The beer project
                        </div>
                        <span className='charity-description'>
                            You can provide clean, safe and reliable beer today.
                        </span>                    
                        <div className='charity-buttons'>
                            <Button  onClick={() => onSelect(Charities.TheWaterProject)} >
                                Donate & Play
                            </Button>
                        </div>
                    </div>                    
                </div>
            </div>
        </Panel>

    )
}
