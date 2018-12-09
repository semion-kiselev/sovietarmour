module.exports = {
    siteMetadata: {
        title: '',
    },
    plugins: [
        'gatsby-plugin-styled-components',
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/static`
            },
        },
        'gatsby-transformer-json'
    ]
}
