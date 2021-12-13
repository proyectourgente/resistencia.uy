import React, {useState} from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"

import DiffMatchPatch from 'diff-match-patch-with-word';

import ReactDiffViewer, {DiffMethod} from 'react-diff-viewer';
import SEO from "../components/seo";
import Navigation from "../components/navigation";
import SocialShare from "../components/socialshare";
import {FaExchangeAlt} from "react-icons/all";


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

var diffPerWord = function (dmp, text1, text2) {
    var b = dmp.diff_linesToWords_(text1, text2);
    var lineArray = b.lineArray;
    var lineText1 = b.chars1;
    var lineText2 = b.chars2;
    var diffs = dmp.diff_main(lineText1, lineText2, false);
    dmp.diff_cleanupSemantic(diffs)
    dmp.diff_charsToLines_(diffs, lineArray);
    return diffs;
}


export default function Articulo({data}) {

    const [verCorregido, setVerCorregido] = useState(true)

    const articulo = data.allLucJson.nodes[0]
    const meta = data.indice.nodes.find((art) => art.NRO_ARTICULO.toString() === articulo.numeroArticulo.toString())
    const title = 'Artículo ' + articulo.numeroArticulo + ' - ' + meta.DESC_ARTICULO
    const lista_articulos = data.indice.nodes.map((articulo) => articulo.NRO_ARTICULO.toString())
    const explicacion = data.allExplicacionesYaml.nodes.filter(exp => exp.NRO_ARTICULO === parseInt(articulo.numeroArticulo))[0]

    const dmp = new DiffMatchPatch();
    const diff = diffPerWord(dmp, limpiarTexto(articulo.textoOriginal), limpiarTexto(articulo.textoModificado));

    return (
        <Layout>
            <SEO title={title}/>
            <Navigation actual={articulo.numeroArticulo} lista={lista_articulos} tituloActual={title}
                        seccion={meta.NRO_SECCION} capitulo={meta.NRO_CAPITULO}/>
                                        <SocialShare title={title} slug={articulo.numeroArticulo}/>

            <div className="flex flex-col md:w-8/12 mx-auto md:mt-5 text-gray-600">
                <span className="text-xl text-center my-2 text-gray-600 font-black uppercase">{articulo.numeroArticulo + " - " + meta.DESC_ARTICULO}</span>
                <span className="my-2 text-center">{articulo.notasArticulo}</span>
                {articulo.textoModificado ?
                    <div className="flex flex-col">
                        <span
                            className="font-black text-gray-600 uppercase mt-5 mb-5 border-b w-full mx-auto text-center rounded">{"Art. "+articulo.numeroArticulo + " - comparación"}</span>
                        <button onClick={() => {
                            setVerCorregido(!verCorregido)
                        }} className="text-sm mb-1 text-gray-600 flex justify-center items-center  md:w-1/3 mt-1 md:mt-0 mx-auto">
                            <span className="mr-2 bg-gray-600 text-white rounded-full w-7 h-7 flex items-center justify-center"><FaExchangeAlt/></span>
                            {verCorregido ?
                                <span>Ver <span style={{background: "#fdb8c0"}}>antes</span> y <span
                                    style={{background: "#acf2bd"}}>después</span></span> :
                                <span>Ver <span className="line-through">texto corregido</span></span>

                            }
                        </button>

                        {articulo.numeroArticulo === "404" || verCorregido ?
                            <div className="flex flex-col">
                                <span className="text-sm text-white bg-gray-600 text-center my-3 mx-auto">Lo que la LUC eliminó se muestra en rojo tachado, y en verde se destaca el texto agregado</span>
                                <div dangerouslySetInnerHTML={{__html: dmp.diff_prettyHtml(diff)}}/>
                            </div> :
                            <div className="flex flex-col">
                                <span className="text-sm text-white bg-gray-600 text-center my-3 mx-auto">En la redacción anterior se destaca con rojo lo borrado. Debajo, en la vigente, se destaca con verde lo nuevo</span>

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
                        }
                    </div>
                    :
                    <div className="mt-10">
                        <h3>No existe versión anterior con que comparar</h3>
                    </div>
                }
                 <span
                    className="font-black text-gray-600 uppercase mt-5 mb-5 border-b mx-auto w-full text-center rounded">{"Art. "+articulo.numeroArticulo + " - texto actual"}</span>
                <p className="mt-3">{articulo.textoModificado ? limpiarTexto(articulo.textoModificado) : limpiarTexto(articulo.textoOriginal)}</p>
              
                {explicacion ?
                    <span
                        className="font-black text-gray-600 uppercase mt-5 mb-5 border-b w-full mx-auto text-center rounded">{"Art. "+articulo.numeroArticulo + " - comentario"}</span>
                    : <div className="hidden"></div>}
                {explicacion ?
                    <p className="mt-3">{explicacion.EXPLICACION}</p> : <div className="hidden"></div>
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
      allExplicacionesYaml {
        nodes {
          NRO_ARTICULO
          EXPLICACION
        }
      }
  }
`
