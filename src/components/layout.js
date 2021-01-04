/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import {graphql, useStaticQuery} from "gatsby"
import {FaGithub, FaTwitter} from 'react-icons/fa';

import Header from "./header"
import "./layout.css"

const Layout = ({children}) => {
    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    return (
        <>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`}/>
            <div className="container mx-auto px-5 lg:px-20 ">
                <main>{children}</main>
                <footer className="mt-10">
                    <div className="mx-auto p-5 w-100 lg:w-1/2 font-sans text-center">

                        <h3 className="text-red-700 text-sm">¿Encontraste algún error? ¿Tenés sugerencias? ¿Querés
                            colaborar?</h3>
                        <div className="flex w-1/3 lg:w-10 mx-auto mt-5">
                            <a className="px-2 text-red-700 hover:text-gray-100 visited:text-gray-300"
                               href="https://twitter.com/raulsperoni" target="_blank" title="Twitter"
                               rel="noopener noreferrer">
                                <FaTwitter/>
                            </a>
                            <a className="px-2 text-red-700 hover:text-gray-100 visited:text-gray-300"
                               href="https://github.com/raulsperoni/resistencia.uy" target="_blank" title="Github"
                               rel="noopener noreferrer">
                                <FaGithub/>
                            </a>
                        </div>

                        <span className=" text-xs text-red-700">
                <p className="mt-5">
                    {new Date().getFullYear()}, Hecho con
                    {` `}
                    <a href="https://www.gatsbyjs.com">Gatsby</a>. Este proyecto está en construcción y pretende colaborar con el intento de anular los artículos más dañinos de la LUC.

                </p>
                    </span>
                    </div>

                </footer>
            </div>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
