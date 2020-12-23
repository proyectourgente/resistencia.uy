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
                <h1>{articulo.notasArticuloMarkdown}</h1>
                <div dangerouslySetInnerHTML={{ __html: articulo.notasArticuloMarkdown }} />

                <ReactDiffViewer
                    oldValue={limpiarTexto(articulo.textoOriginalMarkdown)}
                    newValue={limpiarTexto(articulo.textoModificadoMarkdown)}
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
          textoArticuloMarkdown
          numeroArticulo
          seccionArticulo
          textoModificadoMarkdown
          textoOriginalMarkdown
          notasArticuloMarkdown
        }
      }
  }
`