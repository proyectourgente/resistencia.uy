import React from "react"
import {Link} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


class IndexPage extends React.Component {

    render() {
        const {data} = this.props
        const articulos = data.articulos.nodes

        return (
            <Layout>
                <SEO title="Home"/>
                <h1>Lista de artículos a derogar</h1>
                {articulos.map((articulo) => {
                    return <span><Link
                        to={articulo.numeroArticulo}>
                        {articulo.numeroArticulo}
                    </Link> </span>
                })
                }
            </Layout>
        )
    }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    articulos: allLucJson {
        nodes {
          numeroArticulo
        }
      }
    }
  
`
