/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async function ({ actions, graphql }) {
    const { data } = await graphql(`
    {
      articulos: allLucJson {
        nodes {
          textoArticuloMarkdown
          numeroArticulo
          seccionArticulo
          textoModificadoMarkdown
          textoOriginalMarkdown
          notasArticuloMarkdown
        }
      }
    }
  `)
    data.articulos.nodes.forEach(edge => {
        const slug = edge.numeroArticulo
        actions.createPage({
            path: slug,
            component: require.resolve(`./src/templates/articulo.js`),
            context: { slug: slug },
        })
    })
}