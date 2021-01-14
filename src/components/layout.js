/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import {graphql, useStaticQuery} from "gatsby"
import {FaGithub, FaTelegramPlane, FaTwitter} from 'react-icons/fa';

import Header from "./header"
import "./layout.css"
import {FaTelegram} from "react-icons/all";
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
        <div className="flex flex-col h-screen justify-between font-book">
            <Header siteTitle={data.site.siteMetadata?.title || `Title`}/>
            <div className="mb-auto container mx-auto px-5 lg:px-32 xl:px-40">
                <main>{children}</main>
            </div>
            <Footer/>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
