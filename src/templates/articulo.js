import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"


import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';

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


export default function Articulo({ data }) {
    const articulo = data.allLucJson.nodes[0]
    const meta = data.indice.nodes.find((art) => art.NRO_ARTICULO === articulo.numeroArticulo)
    console.log(data.indice.nodes, articulo.numeroArticulo)
    return (
        <Layout>
            <div className="font-sans">
                <h2>Artículo {articulo.numeroArticulo} - {meta.DESC_ARTICULO}</h2>
                <h2>Sección {articulo.seccionArticulo} - Capítulo {articulo.capituloArticulo}</h2>
                <p>{articulo.notasArticulo}</p>
                <p>{articulo.textoModificado}</p>
                <ReactDiffViewer
                    oldValue={limpiarTexto(articulo.textoOriginal)}
                    newValue={limpiarTexto(articulo.textoModificado)}
                    showDiffOnly={false}
                    splitView={false}
                    hideLineNumbers={true}
                    disableWordDiff={false}
                    compareMethod={DiffMethod.WORDS}/>
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