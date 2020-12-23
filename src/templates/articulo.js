import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"


import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';

function limpiarTexto(texto) {
    texto = texto.replaceAll('\n','')
    texto = texto.replaceAll('(*)','')
    texto = texto.trim()

    return texto
}


export default function Articulo({ data }) {
    const articulo = data.allLucJson.nodes[0]
    return (
        <Layout>
            <div>
                <h1>Artículo {articulo.numeroArticulo}</h1>
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
  }
`