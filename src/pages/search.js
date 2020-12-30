import * as React from 'react'
import {useState} from 'react'
import {useStaticQuery} from 'gatsby'
import {useLunr} from 'react-lunr'

const SearchPage = () => {
    const queryData = useStaticQuery(graphql`
    query {
      localSearchArticulos {
        index
        store
      }
    }
  `)
    const index = queryData.localSearchArticulos.index
    const store = queryData.localSearchArticulos.store

    const [query, setQuery] = useState('')
    const results = useLunr(query, index, store)

    return (
        <main>
            <h1>Search</h1>
            <label>
                <span>Search query</span>
                <input
                    name="query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </label>
            <h2>Results</h2>
            {results.length > 0 ? (
                <ul>
                    {results.map((result) => (
                        <li key={result.numeroArticulo}>{result.numeroArticulo}</li>
                    ))}
                </ul>
            ) : (
                <p>No results!</p>
            )}
        </main>
    )
}

export default SearchPage