import React, {useState} from "react"
import {Link} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {useLunr} from "react-lunr";


const IndexPage = ({data}) => {

    const articulos = data.articulos.nodes
    const index = data.localSearchArticulos.index
    const store = data.localSearchArticulos.store

    const [query, setQuery] = useState('')
    const results = useLunr(query, index, store)

    return (
        <Layout>
            <SEO title="Home"/>
            <h1>Lista de artículos a derogar</h1>
            <label>
                <span>Buscar por palabras: </span>
                <input
                    name="query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </label>
            <p></p>
            {results.length > 0 ? (
                <div>
                    <h3>Mostrando artículos con "{query}"</h3>
                    {results.map((result) => (
                        <span><Link
                            to={result.numeroArticulo}>
                        {result.numeroArticulo}
                    </Link> </span>
                    ))}
                </div>
            ) : (
                <div>
                    <h3>Mostrando todos</h3>
                    {articulos.map((articulo) => {
                        return <span><Link
                            to={articulo.numeroArticulo}>
                        {articulo.numeroArticulo}
                    </Link> </span>
                    })
                    }
                </div>
            )}

        </Layout>
    )

}

export default IndexPage

export const pageQuery = graphql`
  query {
    articulos: allLucJson {
        nodes {
          numeroArticulo
        }
      }
    localSearchArticulos {
        index
        store
      }
    }
  
`
