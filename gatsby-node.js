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
        });

        graphql(`
            {
                sections: allSectionsJson {
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

                subsections: allSubsectionsJson {
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
