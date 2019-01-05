import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import Cards from '../components/cards';
import {pageNames, itemsArticlesToDisplayInNews} from '../constants';
import trans from '../lang';
import {SHOPPING_FORM_NAME} from '../constants';

const getSortedItemsByPositionInNews = (itemEdges) => {
    const ar = [];

    itemEdges.forEach(edge => {
        const article = edge.node.article;
        const index = itemsArticlesToDisplayInNews.indexOf(article);
        ar[index] = edge;
    });

    return ar;
}

class Home extends PureComponent {
    render() {
        const {locale} = this.props.pageContext;
        const items = getSortedItemsByPositionInNews(this.props.data.items.edges);
        const normalizedItems = items.map(item => item.node);

        return (
            <Layout
                locale={locale}
                title={trans.HOME_HEAD_TITLE[locale]}
                description={trans.HOME_HEAD_DESCRIPTION[locale]}
                pageTitle={trans.HOME_PAGE_TITLE[locale]}
                pageSubtitle={trans.HOME_PAGE_SUBTITLE[locale]}
                pageName={pageNames.HOME}
            >
                <>
                    <div className="b-content">
                        <Cards
                            cards={normalizedItems}
                            locale={locale}
                        />
                    </div>
                    <form name={SHOPPING_FORM_NAME} method="post" data-netlify="true" data-netlify-honeypot="bot-field" style={{display: 'none'}}>
                        <input type="hidden" name="form-name" value={SHOPPING_FORM_NAME} />
                        <input type="text" name="buyerName" />
                        <input type="text" name="buyerEmail" />
                        <input type="text" name="shippingAddress" />
                        <input type="text" name="items" />
                    </form>
                </>
            </Layout>
        );
    }
}

Home.propTypes = {
    pageContext: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default Home;

export const IndexQuery = graphql`
    query IndexQuery($itemsArticlesToDisplayInNews: [String]) {
        items: allItemsJson (
            filter: {
                article: {in: $itemsArticlesToDisplayInNews},
                visible: {eq: true}
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
