import React, { FC } from 'react'
import '../MultiCheck.css'

type Props = {
    name?: string
}

const Label: FC<Props> = (props):JSX.Element => {
    return (
        <div className="label">
            {props.name}
        </div>
    )
}
export default Label