module.exports = {
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
        background_color: `#ff1f54`,
        theme_color: `#ff1f54`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/profile/*`] },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto Condensed`,
            subsets: [`latin`],
            variants: [`300`, `400`, `700`]
          },
          {
            family: `Roboto`,
            subsets: [`latin`],
            variants: [`300`, `400`, `400italic`, `700`]
          },
          {
            family: `Lato`,
            subsets: [`latin`],
            variants: [`300`, `400`, `700`]
          }
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
