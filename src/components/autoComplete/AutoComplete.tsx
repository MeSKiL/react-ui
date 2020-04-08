import React, {FC, ChangeEvent, KeyboardEvent, ReactElement, useState, useEffect, useRef} from 'react'
import classNames from "classnames";
import Input, {InputProps} from '../input/Input'
import Icon from '../icon/Icon'
import useDebounce from "../../hooks/useDebounce"
import useClickOutside from "../../hooks/useClickOutside"
import Transition from "../transition/Transition"

interface DataSourceObject {
  value: string
}

enum KeyCode {
  'ENTER' = 13,
  'UP' = 38,
  'DOWN' = 40,
  'ESC' = 27
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => Promise<DataSourceType[]> | DataSourceType[]
  onSelect?: (item: DataSourceType) => void
  /** 派发出change事件 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    onChange,
    renderOption,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value as string || '')
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const debouncedValue = useDebounce(inputValue, 500)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(res => {
          setSuggestions(res)
          setLoading(false)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  useEffect(() => {
    setShowDropDown(triggerSearch.current && (!!suggestions.length))
  }, [suggestions])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case KeyCode.ENTER:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case KeyCode.UP:
        highlight(highlightIndex - 1)
        break
      case KeyCode.DOWN:
        highlight(highlightIndex + 1)
        break
      case KeyCode.ESC:
        setSuggestions([])
        break
      default:
        break
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) { // 不建议使用
      onChange(e)
    }
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType): ReactElement | string => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition in={showDropDown || loading} animation='zoom-in-top' timeout={300} onExited={() => {
        setSuggestions([])
      }}>
        <ul className='viking-suggestion-list'>
          {loading && <div className='suggestions-loading-icon'>
            <Icon icon='spinner' spin/>
          </div>}
          {!loading && suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }
  return (
    <div className='viking-auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
