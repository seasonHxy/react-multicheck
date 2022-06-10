import './MultiCheck.css';

import React, {useEffect, FC, useCallback, useRef, useState, Suspense } from 'react';
// import Label from './component/Label'
// import FormBox from './component/FormBox'
const Label = React.lazy(() => import('./component/Label'));
const FormBox = React.lazy(() => import('./component/FormBox'));

export type Option = {
  label: string,
  value: string
}

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options. Assume no duplicated labels or values
 * @param {string[]} values - If `undefined`, makes the component in uncontrolled mode with no options checked;
 *                            if not undefined, makes the component to controlled mode with corresponding options checked.
 *                            The values CAN be duplicated or NOT in the provided options
 * @param {number} columns - default value is 1. If it's bigger than all options count, make it same as the count of all options 
 * @param {Function} onChange - if not undefined, when checked options are changed, they should be passed to outside;
 *                              if undefined, the options can still be selected, but won't notify the outside
 * @param {Function} onRender - will be called if current component rendered. Determine the balance between a reasonable
 *                              render count and readable code
 */
export type Props = {
  label?: string,
  options: Option[],
  columns?: number,
  values?: string[]
  onChange?: (options: Option[]) => void,
  onRender: () => void
}

export const MultiCheck: FC<Props> = (props) => {
  const { onRender, label, columns, values } = props;
  // console.log("props:", props)
  let [version, setVersion ] = useState<number>(0);

  useEffect(()=>{
    setVersion(version + 1 );
    console.log("version:", version)
  }, [label, columns, values]);
  

  // const countRef = useRef(onRender)
  // console.log("countRef:", countRef)
  // if(countRef.current !== onRender) return
 
  {
    // NOTE Don't modify the code block, it can be considered as a performance hint,
    //      you need to find a way to avoid triggering it infinitely
    console.log('### > MultiCheck');
    useEffect(() => {
        onRender()
    }, [version])
  }

  // useEffect(()=>{
  //   countRef.current = onRender;
  // })

  // return <div>TODO
  //   </div>
  return (
    <div className="MultiCheckBox">
      <Suspense fallback={<div>Loading...</div>}>
        <Label name={label ? label: "Checkbox Default Layout"} />
        <FormBox {...props}></FormBox>
      </Suspense>
  </div>
  )
}

