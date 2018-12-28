const path = require('path');

const locales = ['en', 'ru'];
const itemsArticlesToDisplayInNews = [
    'SA87002',
    'SA87001'
];

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions;

    return new Promise((resolve, reject) => {
        locales.forEach(locale => {
            createPage({
                path: `${locale}`,
                component: path.resolve('./src/templates/index.js'),
                context: {
                    locale,
                    itemsArticlesToDisplayInNews
                }
            });
        });

        resolve();
    });
};
