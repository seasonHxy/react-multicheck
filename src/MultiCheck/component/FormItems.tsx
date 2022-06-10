import React,{ FC, ChangeEvent, MouseEvent,RefObject } from 'react';
import { Option } from '../MultiCheck';
import { CheckedItem } from './FormBox';
import Checkbox from './Checkbox';
import  '../MultiCheck.css';

type Props = {
    checkedItems?: CheckedItem[],
    options: Option[],
    selectOnChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    refItem?: RefObject<HTMLInputElement>,
    checkAllClick?: (e: MouseEvent<HTMLInputElement>) => void
}

const FormItems: FC<Props> = (props):JSX.Element => {
    const { options, checkedItems, selectOnChange, refItem, checkAllClick } = props;
    const FormItem = () => {
        return ( options.map((option: Option, index: number) => (
                <Checkbox 
                    key={Math.random()}
                    option={option}
                    checked={checkedItems && checkedItems[index].checked}
                    selectOnChange={selectOnChange}
                    refItem={refItem}
                    checkAllClick={checkAllClick}
                /> 
            ))
        )
    }
    return (
        <div className='items' data-testid='checkboxItem'>
            {FormItem()}
        </div>
    );
}

export default FormItems
