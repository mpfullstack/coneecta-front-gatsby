require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: `Coneecta`,
    description: `Plataforma que ayuda a poner en contacto a personas que necesitan profesionales de cualquier materia, mediante clases individuales por videoconferencia o de forma presencial`,
    author: `@mpfullstack`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-no-sourcemaps`,
    `gatsby-plugin-styled-components`,
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
        name: `Coneecta`,
        short_name: `Coneecta`,
        start_url: `/`,
        background_color: `#003855`,
        theme_color: `#003855`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/profile/*`, `/u/*`] },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto Condensed\:300,400,700`,
          `Roboto\:300,400,400i,700`,
          `Lato\:300,400,700`
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
