import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StaticQuery, graphql, Link} from 'gatsby';
import cn from 'classnames';
import trans from '../lang';
import Overlay from './overlay';
import OutIcon from './icons/out';
import RightChevronIcon from './icons/right-chevron';
import {ACCORDION_ITEM_HEIGHT} from '../constants';

class Sidebar extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeSection: props.currentSectionSlug || '',
            activeSubsection: props.currentSubsectionSlug || ''
        };

        this.handleSectionClick = this.handleSectionClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {currentSectionSlug, currentSubsectionSlug} = this.props;

        if (prevProps.currentSectionSlug !== currentSectionSlug) {
            this.setState({activeSection: currentSectionSlug});
        }

        if (prevProps.currentSubsectionSlug !== currentSubsectionSlug) {
            this.setState({activeSubsection: currentSubsectionSlug});
        }
    }

    handleSectionClick(sectionSlug) {
        return () => {
            if (this.state.activeSection === sectionSlug) {
                this.setState({activeSection: ''});
                return;
            }

            this.setState({activeSection: sectionSlug});
        }
    }

    getNormalizedSections(sections) {
        return sections.edges.filter(section => section.node.visible);
    }

    getNormalizedSubsections(subsections) {
        return subsections.edges
            .filter(subsection => subsection.node.visible)
            .reduce((acc, subsection) => {
                if (!acc[subsection.node.section]) {
                    acc[subsection.node.section] = [];
                }
                acc[subsection.node.section].push(subsection);
                return acc;
            }, {});
    }

    renderAccordion(sections, subsections) {
        const {locale} = this.props;
        const {activeSection, activeSubsection} = this.state;

        return (
            <nav className="b-accordion">
                <ul className="accordion__list">
                    {
                        sections.map(({node}) => (
                            <li
                                key={node.slug}
                                className={
                                    cn('accordion__item', '__level-one', {'__is-active': activeSection === node.slug})
                                }
                                onClick={this.handleSectionClick(node.slug)}
                            >
                                <span className="accordion__link __level-one">
                                    <button className="accordion__button">
                                        <span className="accordion__button-text">
                                            {node.name[locale]}
                                        </span>
                                    </button>
                                    <i className="accordion__icon">
                                        <RightChevronIcon />
                                    </i>
                                </span>

                                <ul
                                    className="accordion__list"
                                    style={{
                                        height: activeSection === node.slug
                                            ? subsections[node.slug].length * ACCORDION_ITEM_HEIGHT
                                            : 0
                                    }}
                                >
                                    {
                                        subsections[node.slug].map(({node}) => (
                                            <li
                                                key={node.slug}
                                                className={cn('accordion__item', '__level-two', {
                                                    '__is-active': activeSubsection === node.slug
                                                })}
                                            >
                                                <Link
                                                    to={`/${locale}/${node.slug}`}
                                                    className="accordion__link __level-two"
                                                >
                                                    <button className="accordion__button">
                                                        <span className="accordion__button-text">
                                                            {node.name[locale]}
                                                        </span>
                                                    </button>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        );
    }

    render() {
        const {locale, isVisible, onRequestClose} = this.props;

        return (
            <StaticQuery
                query={graphql`
                    query DataQuery {
                        sections: allSectionsJson {
                            edges {
                                node {
                                    name {
                                        en,
                                        ru
                                    },
                                    slug,
                                    visible
                                }
                            }
                        }
                        subsections: allSubsectionsJson {
                            edges {
                                node {
                                    name {
                                        en,
                                        ru
                                    },
                                    slug,
                                    visible,
                                    section
                                }
                            }
                        }
                    }
                `}
                render={({sections, subsections}) => {
                    const normalizedSections = this.getNormalizedSections(sections);
                    const normalizedSubsections = this.getNormalizedSubsections(subsections);

                    return (
                        <>
                            <Overlay
                                isVisible={isVisible}
                                onRequestClose={onRequestClose}
                                closeOnOverlayClick
                                noExitIcon
                                light
                            />
                            <div
                                className={cn('b-sidebar', {'__is-visible': isVisible})}
                                tabIndex="1"
                            >
                                <i className="sidebar__close" onClick={onRequestClose}>
                                    <OutIcon />
                                </i>
                                <div className="sidebar__header">
                                    {trans.NAV_CATALOG[locale]}
                                </div>
                                <div className="sidebar__content">
                                    {
                                        this.renderAccordion(normalizedSections, normalizedSubsections)
                                    }
                                </div>
                            </div>
                        </>
                    );
                }}
            />
        );
    }
}

Sidebar.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    currentSectionSlug: PropTypes.string,
    currentSubsectionSlug: PropTypes.string
};

export default Sidebar;
