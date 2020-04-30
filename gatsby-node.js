const path = require('path');

const locales = ['en', 'ru'];
const itemsArticlesToDisplayInNews = [
    'Z72038',
    'SA924',
    'IBG72060',
    'IBG72055',
    'IBG72056',
    'IBG72057',
    'IBG72075',
    'PST72100',
    'SA925',
    'SEA034',
    'Gr7210',
    'IBG72070',
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

            createPage({
                path: `${locale}/about-us`,
                component: path.resolve('./src/templates/about-us.js'),
                context: {
                    locale
                }
            });

            createPage({
                path: `${locale}/where-to-buy`,
                component: path.resolve('./src/templates/where-to-buy.js'),
                context: {
                    locale
                }
            });

            createPage({
                path: `${locale}/search`,
                component: path.resolve('./src/templates/search.js'),
                context: {
                    locale
                }
            });
        });

        graphql(`
            {
                sections: allSectionsJson(
                    filter: {
                        visible: {eq: true}
                    }
                ) {
                    edges {
                        node {
                            name {
                                en,
                                ru
                            },
                            slug
                        }
                    }
                }

                subsections: allSubsectionsJson(
                    filter: {
                        visible: {eq: true}
                    }
                ) {
                    edges {
                        node {
                            title {
                                en,
                                ru
                            },
                            description {
                                en,
                                ru
                            },
                            titleShort {
                                en,
                                ru
                            },
                            slug,
                            section
                        }
                    }
                }
            }
        `)
            .catch(reject)
            .then(({data: {sections, subsections}}) => {
                subsections.edges.forEach(({node: subsection}) => {
                    locales.forEach(locale => {
                        const currentSection = sections.edges.filter(({node: section}) => (
                            section.slug === subsection.section
                        ))[0];

                        createPage({
                            path: `${locale}/${subsection.slug}`,
                            component: path.resolve('./src/templates/subsection.js'),
                            context: {
                                locale,
                                section: currentSection.node,
                                subsection,
                                subsectionSlug: subsection.slug
                            }
                        });
                    });
                });

                resolve();
            })
    });
};
