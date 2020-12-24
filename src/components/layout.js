/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {
    FaGithub, FaTwitter
} from 'react-icons/fa';

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer style={{
          marginTop: `2rem`
        }}>
          {new Date().getFullYear()}, Hecho con
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>. Este proyecto está en construcción y pretende colaborar con el intento de derogar los artículos más dañinos de la LUC. Todos artículos fueron extraídos del portal del IMPO.
            <div>
            <a href="https://twitter.com/raulsperoni" target="_blank" title="Twitter" rel="noopener noreferrer">
                <FaTwitter />
            </a>

            <a href="https://github.com/raulsperoni/resistencia.uy" target="_blank" title="Github" rel="noopener noreferrer">
                <FaGithub />
            </a>
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
