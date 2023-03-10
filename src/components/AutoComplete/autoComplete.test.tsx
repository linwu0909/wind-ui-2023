import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps } from './autoComplete'

config.disabled = true

const testArray = [
    {value: 'ab', number: 11},
    {value: 'abc', number: 123},
    {value: 'b', number: 321},
    {value: 'c', number: 1}
]

const testProps: AutoCompleteProps = {
    fetchSuggestions: (query) => { return testArray.filter(item => item.value.includes(query))},
    onSelect: jest.fn(),
    placeholder: 'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete {...testProps}/>)
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    })
})