import React from 'react'
import {storiesOf} from "@storybook/react"
import {action} from "@storybook/addon-actions"
import AutoComplete, {DataSourceType} from './AutoComplete'

interface LakerPlayerProps {
  value: string
  number: number
}

interface GithubUserProps {
  login:string
  url:string
  avatar_url:string
}
const SimpleComplete = () => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  const handleFetch = (query: string): DataSourceType[] => {
    return lakers.filter(item => item.includes(query)).map(name => {
      return {value: name}
    })
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      style={{width: '300px'}}
      onSelect={action('selected')}
    />
  )
}

const SyncComplete = () => {
  const lakersWithNumber: LakerPlayerProps[] = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0}
  ]
  const handleFetch = (query: string): DataSourceType<LakerPlayerProps>[] => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      style={{width: '300px'}}
      onSelect={action('selected')}
    />
  )
}
const AsyncComplete = () => {
  const renderOption = (item:DataSourceType) => { // 入参必须严格符合要求，出参可以是超集
    let itemWithNumber = item as DataSourceType<GithubUserProps>
    return (
        <p>name:{itemWithNumber.login}</p>
    )
  }
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then((res) => {
        let items:GithubUserProps[] = res.items
        return items.slice(0, 10).map(item => ({value: item.login, ...item}))
      })
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      style={{width: '300px'}}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  )
}

storiesOf('AutoComplete Component', module)
  .add('Simple AutoComplete',SimpleComplete)
  .add('Sync AutoComplete', SyncComplete)
  .add('Async AutoComplete', AsyncComplete)
