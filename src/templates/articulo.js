import React from "react"
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"


import ReactDiffViewer, {DiffMethod} from 'react-diff-viewer';
import SEO from "../components/seo";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";


function limpiarTexto(texto) {
    if (texto instanceof String && texto) {
        texto = texto.replaceAll('\n', '')
        texto = texto.replaceAll('(*)', '')
        texto = texto.trim()
        return texto
    } else if (texto) {
        return texto.toString()
    } else
        return ''
}

function siguienteArticulo(lista, actual) {
    let cantidad_articulos = lista.length
    let posicion_actual = lista.indexOf(actual, 0)
    let posicion_siguiente = posicion_actual + 1
    if (posicion_siguiente < cantidad_articulos) {
        return "/".concat(lista[posicion_siguiente].toString())
    } else {
        return "/"
    }
}

function anteriorArticulo(lista, actual) {
    let posicion_actual = lista.indexOf(actual, 0)
    let posicion_anterior = posicion_actual - 1
    if (posicion_anterior >= 0) {
        return "/".concat(lista[posicion_anterior].toString())
    } else {
        return "/"
    }
}


export default function Articulo({data}) {
    const articulo = data.allLucJson.nodes[0]
    const meta = data.indice.nodes.find((art) => art.NRO_ARTICULO.toString() === articulo.numeroArticulo.toString())
    const title = 'Artículo ' + articulo.numeroArticulo + ' - ' + meta.DESC_ARTICULO
    const lista_articulos = data.indice.nodes.map((articulo) => articulo.NRO_ARTICULO.toString())

    return (
        <Layout>
            <SEO title={title}/>
            <div className="flex mx-auto align-middle w-2/3 lg:w-1/4 mb-5 lg:mb-0">
                <Link
                    to={anteriorArticulo(lista_articulos, articulo.numeroArticulo)}
                    className="w-2/5 flex items-center justify-around text-red-700 hover:text-gray-700 visited:text-red-700">
                    <FaArrowLeft/><span>Anterior</span>
                </Link>
                <span className="w-1/5"/>
                <Link
                    to={siguienteArticulo(lista_articulos, articulo.numeroArticulo)}
                    className="w-2/5 flex items-center justify-around text-red-700 hover:text-gray-700 visited:text-red-700">
                    <span>Siguiente</span><FaArrowRight/>
                </Link>
            </div>
            <div className="font-sans">
                <h3 className="mb-2">SECCIÓN {meta.NRO_SECCION} > CAPÍTULO {meta.NRO_CAPITULO} >
                    ARTÍCULO {articulo.numeroArticulo}</h3>

                <h2 className="mb-2 text-red-700 font-bold">{meta.DESC_ARTICULO}</h2>
                <p>{articulo.notasArticulo}</p>
                <p className="mt-5 font-serif">{limpiarTexto(articulo.textoModificado)}</p>

                <div className="mt-10">
                    <h3 className="mb-2">ANTES (rojo) Y DESPUÉS (verde)</h3>
                    <ReactDiffViewer
                        oldValue={limpiarTexto(articulo.textoOriginal)}
                        newValue={limpiarTexto(articulo.textoModificado)}
                        showDiffOnly={true}
                        splitView={false}
                        hideLineNumbers={true}
                        disableWordDiff={false}
                        useDarkTheme={false}
                        compareMethod={DiffMethod.WORDS}/>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
      allLucJson(filter: {numeroArticulo: {eq: $slug}}) {
        nodes {
          numeroArticulo
          seccionArticulo
          capituloArticulo
          textoModificado
          textoOriginal
          notasArticulo
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