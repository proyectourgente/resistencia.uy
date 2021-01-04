import React, {useState} from "react"
import {Link} from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"
import {useLunr} from "react-lunr";

function replaceAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const IndexPage = ({data}) => {

    const index = data.localSearchArticulos.index
    const store = data.localSearchArticulos.store
    const indice = data.indice


    const secciones_desc = {}
    const capitulos_desc = {}
    const secciones = [...new Set(indice.nodes.map(node => {
        secciones_desc[node.NRO_SECCION] = node.DESC_SECCION
        capitulos_desc[node.NRO_SECCION] = {}
        return node.NRO_SECCION
    }))];
    const secc_articulos = secciones.map((seccion) => {
        const arts = indice.nodes.filter(node => node.NRO_SECCION === seccion).map(node => {
            capitulos_desc[seccion][node.NRO_CAPITULO] = node.DESC_CAPITULO
            return node.NRO_CAPITULO
        })
        const cap = [...new Set(arts)]
        return {
            seccion: seccion,
            captitulos: cap,
            cant_articulos: arts.length
        }
    })

    const [query, setQuery] = useState('')
    const [querySinAcento, setQuerySinAcento] = useState('')
    const results = useLunr(querySinAcento, index, store)
    const results_array = results.map(result => result.numeroArticulo)

    /*  const word_count = JSON.parse(index).invertedIndex.map((entry) => {
          let text = entry[0]
          let value = Object.keys(entry[1].textoModificado).length
          return {text, value}
      }).filter(({text,value})=> value>10)
      console.log(word_count)*/


    return (
        <Layout>
            <SEO title="Todos los artículos"/>
            <p className="w-100 text-center font-sans text-xs lg:text-sm">En 2021 se intentarán anular 135 artículos de
                la LUC vía referéndum. Esta es una comparación de los artículos antes y después basada en datos del
                IMPO</p>

            <div className="mx-auto p-5 w-100 lg:w-1/2 ">
                <input
                    placeholder={"Buscar artículos por palabra"}
                    className="mx-auto w-full h-12 focus:outline-none focus:ring focus:border-blue-300 p-2 border-2"
                    name="query"
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value)
                        setQuerySinAcento(replaceAccents(event.target.value))
                    }}
                />
                <span className="font-sans text-center text-xs text-red-700">

                <p className="mt-5">
                    {results.length > 0 ? (<span>Mostrando artículos artículos con "{query}"</span>) : (
                        <span>Mostrando todos los artículos a derogar</span>)}
                </p>
                    </span>
            </div>
            <div className="font-sans">
                {secc_articulos.map(({seccion, cant_articulos, captitulos}) => {
                        const secciones_filtradas = indice.nodes.filter(art => (
                            (results_array.length <= 0 || results_array.includes(art.NRO_ARTICULO.toString())) &&
                            (art.NRO_SECCION === seccion)))
                        return secciones_filtradas.length > 0 ? (
                            <div key={seccion} className="py-3">
                                <h3>SECCIÓN {seccion} - {secciones_desc[seccion]} ({cant_articulos})</h3>
                                {captitulos.map((capitulo) => {
                                    const capitulos_filtrados = secciones_filtradas.filter(art => (art.NRO_CAPITULO === capitulo))
                                    return capitulos_filtrados.length > 0 ? (
                                        <div key={capitulo} className="py-2 pl-4">
                                            <h4 className="mb-2">CAPÍTULO {capitulo} - {capitulos_desc[seccion][capitulo]}</h4>
                                            {capitulos_filtrados.map((art) => (
                                                <ul className="pl-4 py-0.5">
                                                    <li key={art.NRO_ARTICULO}>
                                                        <Link
                                                            to={art.NRO_ARTICULO.toString()}>
                                                            {art.NRO_ARTICULO.toString()} - {art.DESC_ARTICULO}</Link>
                                                    </li>
                                                </ul>
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
