const fs = require('fs')
const path = require('path')

function replaceAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

module.exports = {
  siteMetadata: {
    title: `Ley de Urgente Consideración Comparada`,
    description: `Esta es una comparación basada en datos del IMPO de 135 artículos de la LUC, anteriores y vigentes, que se pretenden anular via referéndum`,
    author: `@raulsperoni`,
    image: `images/LUC.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `LUC Comparada`,
        short_name: `LUC Comparada`,
        description: `Esta es una comparación basada en datos del IMPO de 135 artículos de la LUC, anteriores y vigentes, que se pretenden anular via referéndum.`,
        lang: `es`,
        start_url: `/`,
        background_color: `#034EA2`,
        theme_color: `#FFCB05`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/content/luc`,
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'articulos',
        engine: 'lunr',
        query: fs.readFileSync(
            path.resolve(__dirname, 'src/localSearchQuery.graphql'),
            'utf-8',
        ),
        ref: 'numeroArticulo',
        index: ['textoModificado', 'tituloArticulo', 'comentarioArticulo'],
        store: ['seccionArticulo', 'capituloArticulo', 'numeroArticulo','tituloArticulo', 'comentarioArticulo'],
        normalizer: ({ data }) => {
          const comentarios = data.comentarios.nodes
          return data.articulos.nodes.map((node) => {
            const comentario = comentarios.filter(coment => coment.NRO_ARTICULO === parseInt(node.numeroArticulo))[0]
            return {
              numeroArticulo: node.numeroArticulo,
              capituloArticulo: node.capituloArticulo,
              seccionArticulo: node.seccionArticulo,
              textoModificado: node.textoModificado ? node.textoModificado.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "",
              tituloArticulo: node.tituloArticulo ? node.tituloArticulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "",
              comentarioArticulo: comentario.EXPLICACION
            }
          })
        }
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-LYRHPPN4TP", // Google Analytics / GA
        ],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,

        },
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/content/meta`,
      },
    },
    'gatsby-plugin-postcss',
    `gatsby-plugin-offline`
  ],
}
