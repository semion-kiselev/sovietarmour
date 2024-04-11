const pxToRemOptions = {
  root_value: 16,
  prop_white_list: [
    'font', 'font-size', 'line-height', 'letter-spacing',
    'top', 'right', 'bottom', 'left',
    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'height', 'min-height', 'max-height',
    'width', 'min-width', 'max-width'
  ],
  replace: true,
  media_query: true
};

module.exports = {
  siteMetadata: {
    siteUrl: 'https://sovietarmour.com',
    title: '',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("postcss-pxtorem")(pxToRemOptions)],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static`
      },
    },
    'gatsby-transformer-json',
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        serialize: ({ path }) => ({
          url: path,
        }),
      },
    },
  ]
}
