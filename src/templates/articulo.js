import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"


import ReactDiffViewer, {DiffMethod} from 'react-diff-viewer';
import SEO from "../components/seo";
import Navigation from "../components/navigation";
import SocialShare from "../components/socialshare";


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
            <Navigation actual={articulo.numeroArticulo} lista={lista_articulos} tituloActual={title} seccion={meta.NRO_SECCION} capitulo={meta.NRO_CAPITULO}/>

            <div className="flex flex-col md:w-8/12 mx-auto md:mt-5">


                <span className="text-xl text-center my-2 text-azul font-black uppercase">{meta.DESC_ARTICULO}</span>
                <SocialShare title={title} slug={articulo.numeroArticulo}/>

                <span className="my-2 text-center">{articulo.notasArticulo}</span>
                <span className="font-black bg-azul mt-3 md:my-5 text-amarillo uppercase p-1 w-1/2 mx-auto text-center rounded">texto actual</span>
                <p className="mt-3">{articulo.textoModificado ? limpiarTexto(articulo.textoModificado) : limpiarTexto(articulo.textoOriginal)}</p>


                {articulo.textoModificado ?
                    <div className="flex flex-col">
                        <span
                            className="font-black bg-azul mt-3 md:my-5 text-amarillo uppercase p-1 w-1/2 mx-auto text-center rounded">comparación</span>

                        <span className="text-center my-2">ANTES (rojo) Y DESPUÉS (verde)</span>
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