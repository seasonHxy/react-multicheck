import React, { 
    FC,
    useState,
    ChangeEvent,
    useRef,
    useEffect,
    MouseEvent,
    FormEvent
} from 'react';
import { Props as MultiCheckPrps } from "../MultiCheck";
import {Option} from '../MultiCheck';
import FormItems from './FormItems';
import '../MultiCheck.css';

// declare the select item type
export type CheckedItem = {
    checked: boolean,
    option: Option
}


const FormBox: FC<MultiCheckPrps> = (props):JSX.Element => {
    // console.log("formbox props:", props);
    const { options, values, onChange} = props;
    const [checkedItems, setCheckedItems] = useState<CheckedItem[]>();
    const formElement = useRef<HTMLFormElement>(null);
    const selectAllItem = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        options.unshift({label: 'selectAll', value: 'selectAll'})
    }, []);

    useEffect(() => {
        if(values) {
            const newItems: CheckedItem[] = options.map(option => {
                if(values.indexOf(option.value) > -1){
                    return { checked: true, option: option };
                } else {
                    return { checked: false, option: option };
                }
            });
            setCheckedItems(newItems);
        }
    }, [values]);

    const checkAll = (event: MouseEvent<HTMLInputElement>) => {

        if (formElement.current) {
            let inputs = formElement.current.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++) {
                // it can select all item's status stay all in checked or un-checked.
                inputs[i].checked = event.currentTarget.checked; 
            }
            if (props.values) {
                const newItems = checkedItems;
                newItems?.forEach((item) => {
                    item.checked = event.currentTarget.checked;
                });
                setCheckedItems(newItems);
            }
        }
    }

    const selectOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(values) {
            let newItems = checkedItems?.map((item) =>{
                if (item.option.value === e.currentTarget.value) {
                    item.checked = !item.checked;
                }
                return item;
            })
            setCheckedItems(newItems);
        }
        if (formElement.current && selectAllItem.current) {
            if (!e.currentTarget.checked) selectAllItem.current.checked = false;
            else {
                const inputItems = formElement.current.getElementsByTagName('input');
                let checked = true;
                const inputItemsLen = inputItems.length;
                for (let i = 0; i < inputItemsLen; i++) {
                    if (inputItems[i].className !== 'selectAll' && !inputItems[i].checked) {
                        checked = false;
                    }
                }
                selectAllItem.current.checked = checked;
            }
        }
    }

    /**
     * it can get the options according to the columns to show the layout.
    */
    const getSingleNumberArray = ()=>{
        let singleNumber: Array<number> = [];
        const columns = props.columns ? props.columns : 1;
        const optionLength = options.length;
        const rows = Math.floor(optionLength / columns);
        const rest = optionLength % columns;
        for(let i = 0; i < columns; i++){
            singleNumber[i] = rows * i;
        }
        for(let i = 1;i < columns; i++) {
            if(i < rest) {
                singleNumber[i] +=i;
            } else {
                singleNumber[i] += rest;
            }
        }
        // console.log("singleNumber:", singleNumber)
        return singleNumber;
    }

    const formItems = ()=> {
        const columns = props.columns ? props.columns : 1;
        const singleNumberArr = getSingleNumberArray();
        // console.log("singleNumberArr:", singleNumberArr)
        let items: JSX.Element[] = [];
        for(let i = 0; i< columns; i++) {
            items.push(
                <FormItems
                    key={Math.random()}
                    checkedItems={checkedItems && checkedItems.slice(singleNumberArr[i], singleNumberArr[i + 1])}
                    options={options.slice(singleNumberArr[i], singleNumberArr[i + 1])}
                    selectOnChange={selectOnChange}
                    refItem={selectAllItem}
                    checkAllClick={checkAll}
                    />);
        }
        return items;
    }
    
    const submitBox = (e: FormEvent)=> {
        if(!onChange) return
        e.preventDefault();
        let CheckedItem: Option[] = [];
        if(checkedItems) {
            checkedItems.forEach((item) => {
                if(item.checked && item.option.value !="selectAll") {
                    CheckedItem.push(item.option);
                }
            })
            onChange(CheckedItem);
        }
    }

    return (
        <>
            <form className="formBox"  onSubmit={submitBox}  ref={formElement}>
            {formItems()}
            <div className="submit">
                <button className="submitBtn" type='submit'>submit</button>
            </div>
            </form>
        </>
    )
}

export default FormBox
