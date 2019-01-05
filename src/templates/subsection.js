import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import Cards from '../components/cards';

class Subsection extends PureComponent {
    render() {
        const {locale, section, subsection} = this.props.pageContext;
        const items = this.props.data.items.edges;
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
}

Subsection.propTypes = {
    pageContext: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default Subsection;

export const SubsectionItemsQuery = graphql`
    query SubsectionItemsQuery($subsectionSlug: String!) {
        items: allItemsJson (
            filter: {
                subsection: {eq: $subsectionSlug},
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
