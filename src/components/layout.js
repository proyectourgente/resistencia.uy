/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import {graphql, useStaticQuery} from "gatsby"

import Header from "./header"
import "./layout.css"
import Footer from "./footer";

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
        <div className="flex flex-col h-screen justify-between">
            <Header siteTitle={data.site.siteMetadata?.title || `Title`}/>
            <div className="flex-1 overflow-y-auto pt-5">
                <div className="container mx-auto px-5 lg:px-32 xl:px-40 mb-5">
                    <main>{children}</main>
                </div>
                <div className="block lg:hidden">
                 <Footer/> 
                </div>
            </div>
            <div className="hidden lg:block">
                <Footer/>
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
