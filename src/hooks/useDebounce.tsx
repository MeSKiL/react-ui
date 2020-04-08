import {useState, useEffect} from 'react'

function useDebounce(value: any, delay: number = 300) { // 每当传入新的value时，都会取消上一次的handler,只有300ms不输入才会改变debouncedValue
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce
