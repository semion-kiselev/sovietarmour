import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import Cards from '../components/cards';

export default (props) => {
    const {locale, section, subsection} = props.pageContext;
    const items = props.data.items.edges;
    const normalizedItems = items.map(item => item.node);

    return (
        <Layout
            locale={locale}
            title={subsection.title[locale]}
            description={subsection.description[locale]}
            pageTitle={section.name[locale]}
            pageSubtitle={subsection.titleShort[locale]}
            pageName=""
            currentSectionSlug={section.slug}
            currentSubsectionSlug={subsection.slug}
        >
            <div className="b-content">
                <Cards
                    cards={normalizedItems}
                    locale={locale}
                />
            </div>
        </Layout>
    );
}

export const SubsectionItemsQuery = graphql`
    query SubsectionItemsQuery($subsectionSlug: String!) {
        items: allItemsJson (
            filter: {
                subsection: {eq: $subsectionSlug}
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
