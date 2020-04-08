import React from 'react'
import {config} from 'react-transition-group'
import {render, RenderResult, fireEvent, wait, cleanup} from '@testing-library/react'
import AutoComplete, {AutoCompleteProps} from "./AutoComplete"
import {DataSourceType} from "./AutoComplete"

config.disabled = true

interface TestProp {
  value: string
  number: number
}

const testArray: TestProp[] = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 1},
  {value: 'b', number: 4},
  {value: 'c', number: 15}
]

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter(item => item.value.includes(query))
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

let wrapper: RenderResult
let inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })
  it('test basic AutoComplete behavior', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toBe(2)
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')
  })
  it('should provide keyboard support', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')
    fireEvent.keyDown(inputNode, {keyCode: 40})
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, {keyCode: 40})
    expect(secondResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, {keyCode: 40})
    expect(secondResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, {keyCode: 38})
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, {keyCode: 13})
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11})
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')
  })
  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('renderOption should generate the right template', async () => {
    cleanup()
    const renderOption = (item: DataSourceType) => {
      let newItem = item as DataSourceType<TestProp>
      return (
        <>
          <h2>name:{newItem.value}</h2>
          <p>no:{newItem.number}</p>
        </>
      )
    }
    wrapper = render(<AutoComplete {...testProps} renderOption={renderOption}/>)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      expect(wrapper.container.querySelectorAll('p').length).toBe(2)
    })
  })
  it('async fetchSuggestions should words fine', async () => {
    cleanup()
    const fetchSuggestions = (query: string) => {
      return Promise.resolve(testArray.filter(item => item.value.includes(query)))
    }
    wrapper = render(<AutoComplete fetchSuggestions={fetchSuggestions} placeholder='async-autoComplete'/>)
    inputNode = wrapper.getByPlaceholderText('async-autoComplete') as HTMLInputElement
    fireEvent.change(inputNode, {target: {value: 'a'}})
    await wait(() => {
      expect(wrapper.getByText('ab')).toBeInTheDocument()
    })
  })
})
