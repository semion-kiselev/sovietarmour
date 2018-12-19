import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import Card from '../components/card';
import {pageNames} from '../constants';
import trans from '../lang';

const locale = "en";

export default (props) => (
    <Layout
        locale={locale}
        title={trans.HOME_HEAD_TITLE[locale]}
        description={trans.HOME_HEAD_DESCRIPTION[locale]}
        pageTitle={trans.HOME_PAGE_TITLE[locale]}
        pageSubtitle={trans.HOME_PAGE_SUBTITLE[locale]}
        pageName={pageNames.HOME}
    >
        <div className="b-content">
            {
                props.data.items.edges.map(({node: item}) => (
                    <div
                        key={item.article}
                        className="content__card"
                    >
                        <Card
                            item={item}
                            locale={locale}
                        />
                    </div>
                ))
            }
	    </div>
    </Layout>
);

export const IndexQuery = graphql`
    query IndexQuery {
        items: allItemsJson {
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
