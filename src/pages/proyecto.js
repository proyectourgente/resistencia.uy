import React from "react"


import Layout from "../components/layout"
import SEO from "../components/seo"


const Proyecto = () => {


    return (
        <Layout>
            <SEO title="Acerca del Proyecto"/>
            <div className="mt-10 md:mt-20 flex flex-col w-10/12 md:w-2/3 text-justify mx-auto my-auto h-auto font-sans">

                <p className="mb-1">A partir de una <a
                    href={"https://twitter.com/raulsperoni/status/1336346053323395089?s=20"}
                    target="_blank"
                    rel="noopener noreferrer">conversación de twitter</a> surgió la idea de armar una web para difundir
                    los cambios introducidos por la LUC de una manera clara y accesible.</p>

                <p className="mb-1">El primer paso fue <a
                    href={"https://github.com/raulsperoni/resistencia.uy/blob/main/src/content/luc/LUCScraper.ipynb"}
                    target="_blank" title={"Script en Python"}
                    rel="noopener noreferrer">descargar los artículos</a> de la página del IMPO recuperando además, para
                    cada uno, el texto original.</p>
                <p className="mb-1">Como los datos no variarían con el tiempo se optó por hacer un sitio estático
                    utilizando <a
                        href="https://www.gatsbyjs.com" rel="noopener noreferrer" target={"_blank"}>Gatsby</a> y
                    hostearlo en Github para que no generara costos.</p>
                <p className="mb-1">El proyecto recibió comentarios y aportes de mucha gente y fue mejorando de a
                    poco hasta que nos pusimos en contacto con la campaña por el referéndum para sumar esfuerzos.</p>
                <p className="mb-1">El proyecto es de código abierto y lo podés encontrar, revisar, copiar y modificar
                    en <a href="https://github.com/raulsperoni/resistencia.uy" rel="noopener noreferrer"
                          target={"_blank"}>Github</a>.</p>
                <p className="mb-1">Si encontraste algún error, tenés sugerencias o querés colaborar podés hacerlo mediante issues de <a
                        href="https://github.com/raulsperoni/resistencia.uy/issues" target="_blank" title="Issues de Github"
                        rel="noopener noreferrer">github</a></p>
                { true && <p className="mb-1">Con el equipo ampliado y muchas ideas, se empezó a trabajar en un cuestionario sobre la LUC 
                que ubica a las personas que contestan en grupos, o clústers: <a
                        href="https://luc.com.uy" target="_blank" title="Cuestionario LUC"
                        rel="noopener noreferrer">¿Qué Pensás?</a> </p>}
                <p className="text-center mt-5">{new Date().getFullYear()} <span role="img" aria-label="Closed fist emoji">✊</span></p>

            </div>


        </Layout>
    )

}

export default Proyecto

