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

const autoPrefixerOptions = {browsers: ['last 2 versions', 'ie >= 11']};

module.exports = {
    siteMetadata: {
        title: '',
    },
    plugins: [
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                postCssPlugins: [
                    require('autoprefixer')(autoPrefixerOptions),
                    require('postcss-pxtorem')(pxToRemOptions)
                ]
            },
        },
        'gatsby-plugin-postcss',
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
