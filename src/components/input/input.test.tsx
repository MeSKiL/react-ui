import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import Input, {InputProps} from './Input'

// 会在每个case结束后调用cleanup()
const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input'
}

const disabledProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'disabled-input'
}

describe('test button Component', () => {
  it('should render the correct default Input', () => {
    const wrapper = render(<Input {...defaultProps} />)
    const element = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('viking-input-inner')
    fireEvent.change(element, {target: {value: '223'}})
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(element.value).toBe('223')
  })
  it('should render the disabled Input on disabled property', () => {
    const wrapper = render(<Input {...disabledProps} disabled/>)
    const divRef = wrapper.container.querySelector('div') as HTMLDivElement
    expect(divRef).toHaveClass('is-disabled')
    const element = wrapper.getByPlaceholderText('disabled-input') as HTMLInputElement
    expect(element.disabled).toBeTruthy()
  })

  it('should render different input sizes on size property', () => {
    const wrapper = render(<Input {...defaultProps} size='lg' />)
    const element = wrapper.getByTestId('test-input') as HTMLInputElement
    expect(element).toHaveClass('input-size-lg')
  })
  it('should render prepend and append element on prepend/append property', () => {
    const wrapper = render(<Input placeholder='pend' prepend='https://' append='.com' />)
    const element = wrapper.getByTestId('test-input')
    expect(element).toHaveClass('input-group input-group-append input-group-prepend')
    expect(wrapper.queryByText('https://')).toBeInTheDocument()
    expect(wrapper.queryByText('.com')).toBeInTheDocument()
  })
})
