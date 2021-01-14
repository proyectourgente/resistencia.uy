import React from "react"


import Layout from "../components/layout"
import SEO from "../components/seo"


const Proyecto = ({}) => {


    return (
        <Layout>
            <SEO title="Acerca del Proyecto"/>
            <span className=" text-sm text-white">
                <p className="mt-5">
                    {new Date().getFullYear()}, Hecho con
                    {` `}
                    <a href="https://www.gatsbyjs.com">Gatsby</a>. Este proyecto está en construcción y pretende colaborar con el intento de anular los artículos más dañinos de la LUC.

                </p>
                    </span>

        </Layout>
    )

}

export default Proyecto

