import React, {useState} from "react"
import {Link} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {useLunr} from "react-lunr";


const IndexPage = ({data}) => {

    const articulos = data.articulos.nodes
    const index = data.localSearchArticulos.index
    const store = data.localSearchArticulos.store
    const indice = data.indice

    const secciones = [...new Set(indice.nodes.map(node => node.NRO_SECCION))];
    const secc_articulos = secciones.map((seccion) => {
        const arts = indice.nodes.filter(node => node.NRO_SECCION === seccion).map(node => node.NRO_CAPITULO)
        const cap = [...new Set(arts)]
        return {
            seccion: seccion,
            captitulos: cap,
            cant_articulos: arts.length
        }
    })

    const [query, setQuery] = useState('')
    const results = useLunr(query, index, store)
    const results_array = results.map(result => result.numeroArticulo)

    return (
        <Layout>
            <SEO title="Home"/>
            <label>
                <span>Buscar por palabras: </span>
                <input
                    name="query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </label>
            <h1></h1>
            <div>
                <span>{results.length > 0 ? (<h3>Mostrando artículos artículos a derogar con "{query}"</h3>):(<h3>Mostrando todos los artículos a derogar</h3>)}</span>
                {secc_articulos.map(({seccion, cant_articulos, captitulos}) => {
                        const secciones_filtradas = indice.nodes.filter(art => (
                            (results_array.length <= 0 || results_array.includes(art.NRO_ARTICULO.toString())) &&
                            (art.NRO_SECCION === seccion)))
                        return secciones_filtradas.length > 0 ? (
                            <div>
                                <h2>SECCIÓN {seccion} ({cant_articulos})</h2>
                                {captitulos.map((capitulo) => {
                                    const capitulos_filtrados = secciones_filtradas.filter(art => (art.NRO_CAPITULO === capitulo))
                                    return capitulos_filtrados.length > 0 ? (
                                        <div>
                                            <h3>CAPÍTULO {capitulo}</h3>
                                            {capitulos_filtrados.map((art) => (
                                                <div>

                                        <span><Link
                                            to={art.NRO_ARTICULO.toString()}>
                                            {art.NRO_ARTICULO.toString()} {art.DESC_ARTICULO}
                                        </Link> </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (<div></div>)
                                })}
                            </div>
                        ) : (<div></div>)
                    }
                )}

            </div>
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
                    indiceSeccion: allIndiceYaml {
                    group(field: NRO_SECCION) {
                    fieldValue
                    totalCount
                    nodes {
                    NRO_CAPITULO
                }
                }
                }
                    indiceCapitulo: allIndiceYaml {
                    group(field: NRO_CAPITULO) {
                    fieldValue
                    totalCount
                    nodes {
                    NRO_SECCION
                }
                }
                }
                    indice: allIndiceYaml {
                    nodes {
                    NRO_CAPITULO
                    DESC_CAPITULO
                    NRO_ARTICULO
                    DESC_ARTICULO
                    NRO_SECCION
                    DESC_SECCION
                }
                }
                }

                    `
