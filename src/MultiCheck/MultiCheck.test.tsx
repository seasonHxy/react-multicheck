import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import {MultiCheck, Option} from './MultiCheck';

// TODO more tests
const defaultLabel:string = "testLabel";
let renderCount: number = 0;
function defaultOnRender(){
  renderCount++
}

const defaultOptions: Option[] = [
  {label: 'aaa', value: '111',},
  {label: 'bbb', value: '222',},
  {label: 'ccc', value: '333',},
  {label: 'ddd', value: '444',},
  {label: 'eee', value: '555',},
  {label: 'fff', value: '666',},
  {label: 'ggg', value: '777',},
  {label: 'hhh', value: '888',},
  {label: 'iii', value: '999',},
];
const  customOption: Option[] = [
  {label: 'selectAll', value: 'selectAll'},
]
const defaultValues: string[] = ['333', '999'];

describe('MultiCheck', () => {
  describe('initialize', () => {
    it('renders the label if label provided', () => {
      // TODO
      render(
        <MultiCheck options={[{label: 'ccc', value: '333',  }]} onRender={defaultOnRender} label={defaultLabel} />
      )
      expect(screen.getByText(defaultLabel)).toBeInTheDocument();
    });

    it(' renders the checkbox if any columns provided', ()=> {
      render(
              <MultiCheck options={defaultOptions} onRender={defaultOnRender} />
            );
      let checkboxItems = screen.getAllByTestId('checkboxItem');
      expect(checkboxItems).toHaveLength(1); 
    });

    it('renders the default selected values if values provided', ()=> {
      const { getByLabelText } = render(
          <MultiCheck options={defaultOptions} onRender={defaultOnRender} values={defaultValues} />
      );
      expect(getByLabelText('bbb')).not.toBeChecked();
      expect(getByLabelText('ccc')).toBeChecked();

    });
  });
});

describe('interactive', () => {
  it('should be all selected if click selectAll checkbox', ()=> {
    const { getByLabelText, getAllByText, queryAllByText } = render(
      <MultiCheck options={defaultOptions} onRender={defaultOnRender} values={defaultValues} />
    );
    fireEvent.click(queryAllByText('selectAll')[0]);
    defaultOptions.map(isChecked);
    function isChecked(option: Option) {
      option.label !== "selectAll" && expect(getByLabelText(option.label)).toBeChecked();
    }
  });

  it('all checkbox should not selected if double click selectAll', ()=> {
    const { getByLabelText, getAllByText } = render(
      <MultiCheck options={defaultOptions} onRender={defaultOnRender} values={defaultValues} />
    );
    fireEvent.click(getAllByText('selectAll')[0]);
    fireEvent.click(getAllByText('selectAll')[0]);
    defaultOptions.map(isChecked);
    function isChecked(option: Option) {
      option.label !== "selectAll" && expect(getByLabelText(option.label)).not.toBeChecked();
    }
  })

  it('should selectAll is un-checked if un-checked one checkbox', function () {
    const { getByLabelText, getAllByText } = render(
      <MultiCheck options={defaultOptions} onRender={defaultOnRender} values={defaultValues} />
    );
    const selectAll = getAllByText('selectAll')[0];
    fireEvent.click(selectAll);
    fireEvent.click(getByLabelText('ggg'));
    expect(selectAll).not.toBeChecked();
  });

  it('should be picked if click the checkbox', ()=> {
    const { getByLabelText } = render(
      <MultiCheck options={defaultOptions} onRender={defaultOnRender} values={defaultValues} />
    );
    const checkBox = getByLabelText('hhh');
    expect(checkBox).not.toBeChecked();
    fireEvent.click(checkBox);
    expect(getByLabelText('hhh')).toBeChecked();
  })
});
