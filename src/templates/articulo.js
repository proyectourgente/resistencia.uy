import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"


import ReactDiffViewer, {DiffMethod} from 'react-diff-viewer';
import SEO from "../components/seo";
import SocialShare from "../components/socialshare";
import Navigation from "../components/navigation";


function limpiarTexto(texto) {
    if (texto) {
        texto = texto.toString()
        texto = texto.replace(/\n/gm, '')
        texto = texto.replace(/\(\*\)/gm, '')
        texto = texto.trim()
        return texto
    } else
        return ''
}


export default function Articulo({data}) {
    const articulo = data.allLucJson.nodes[0]
    const meta = data.indice.nodes.find((art) => art.NRO_ARTICULO.toString() === articulo.numeroArticulo.toString())
    const title = 'Artículo ' + articulo.numeroArticulo + ' - ' + meta.DESC_ARTICULO
    const lista_articulos = data.indice.nodes.map((articulo) => articulo.NRO_ARTICULO.toString())

    return (
        <Layout>
            <SEO title={title}/>
            <Navigation actual={articulo.numeroArticulo} lista={lista_articulos} tituloActual={title}/>

            <div className="font-sans">
                <h3 className="mb-2">SECCIÓN {meta.NRO_SECCION} > CAPÍTULO {meta.NRO_CAPITULO} >
                    ARTÍCULO {articulo.numeroArticulo}</h3>

                <h2 className="mb-2 text-red-700 font-bold">{meta.DESC_ARTICULO}</h2>
                <p>{articulo.notasArticulo}</p>
                <p className="mt-5 font-serif">{articulo.textoModificado ? limpiarTexto(articulo.textoModificado) : limpiarTexto(articulo.textoOriginal)}</p>

                {articulo.textoModificado ?
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
                    :
                    <div className="mt-10">
                        <h3>No existe versión anterior con que comparar</h3>
                    </div>
                }
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