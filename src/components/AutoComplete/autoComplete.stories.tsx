import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'

interface LakerPlayerProps {
    value: string;
    number?: number; 
}

interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const SimpleComplete = () => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query))
    // }
    const lakersWithNumber = [
        {value: 'bradley', number: 1},
        {value: 'pope', number: 2},
        {value: 'caruso', number: 3},
        {value: 'cook', number: 4},
        {value: 'cousins', number: 5}
    ]
    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(player => player.value.includes(query))
    // }
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({items}) => {
                return items.slice(0, 10).map((item: { login: any; }) => ({value: item.login, ...item}))
            })
    }
    const renderOption = (item: DataSourceType<GithubUserProps>) => {
        return (
            <>
            {/* <h2>Name: {item.value}</h2> */}
            {/* <p>Number: {item.number}</p> */}
            {/* <h2>Name: {item.login}</h2> */}
            {/* <p>Url: {item.url}</p> */}
            <h2>{item.login}</h2>
            </>
        )
    }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            // renderOption={renderOption}
            />
    )
}

storiesOf('AutoComplete Component', module)
    .add('AutoComplete', SimpleComplete)