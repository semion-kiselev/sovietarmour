// todo:
// add search
// filter for visible sections/subsections/items
// page freeze on overlay
// add prop-types
// add public files (robots + ga + sitemap + if ie < 11)
// add _redirect
// fill items.json
// complete check in ie11, edge, chrome, firefox, opera

import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import Cards from '../components/cards';
import {pageNames, itemsArticlesToDisplayInNews} from '../constants';
import trans from '../lang';

const getSortedItemsByPositionInNews = (itemEdges) => {
    const ar = [];

    itemEdges.forEach(edge => {
        const article = edge.node.article;
        const index = itemsArticlesToDisplayInNews.indexOf(article);
        ar[index] = edge;
    });

    return ar;
}

export default (props) => {
    const {locale} = props.pageContext;
    const items = getSortedItemsByPositionInNews(props.data.items.edges);

    return (
        <Layout
            locale={locale}
            title={trans.HOME_HEAD_TITLE[locale]}
            description={trans.HOME_HEAD_DESCRIPTION[locale]}
            pageTitle={trans.HOME_PAGE_TITLE[locale]}
            pageSubtitle={trans.HOME_PAGE_SUBTITLE[locale]}
            pageName={pageNames.HOME}
        >
            <div className="b-content">
                <Cards
                    cards={items}
                    locale={locale}
                />
            </div>
        </Layout>
    );
}

export const IndexQuery = graphql`
    query IndexQuery($itemsArticlesToDisplayInNews: [String]) {
        items: allItemsJson (
            filter: {
                article: {in: $itemsArticlesToDisplayInNews}
            }
        ) {
            edges {
                node {
                    article,
                    name {
                        ru,
                        en
                    },
                    description {
                        ru,
                        en
                    },
                    price,
                    image
                }
            }
        }
    }
`;
