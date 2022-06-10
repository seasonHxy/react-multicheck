import React, { FC, ChangeEvent, RefObject, MouseEvent } from 'react';
import { Option } from '../MultiCheck';

type Props = {
    checked?: boolean,
    option: Option, 
    selectOnChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    refItem?: RefObject<HTMLInputElement>,
    checkAllClick?: (e: MouseEvent<HTMLInputElement>) => void
}

const Checkbox: FC<Props> = (props): JSX.Element => {
    const { option, checked, selectOnChange, refItem,checkAllClick } = props;
    return (
        <label>
                {
                    option.value === "selectAll" ?
                        <input type="checkbox" className="selectAll" ref={refItem} onClick={checkAllClick}/>
                        :
                        <input 
                            type="checkbox"
                            className="selectOne"
                            name={option.label}
                            value={option.value}
                            checked={checked}
                            onChange={selectOnChange}
                        />
                }
                <div className="optionName">{option.label}</div>
        </label>
    )
}
export default Checkbox
