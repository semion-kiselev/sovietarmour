import '../styles/index.scss';
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from './header';
import Footer from './footer';
import Title from './title';
import {OrderedItemsProvider} from '../contexts/ordered-items';
import {RootFreezeProvider, RootFreezeConsumer} from '../contexts/root-freeze';


const Layout = ({
    children, locale, title, description, pageName, pageTitle, pageSubtitle,
    currentSectionSlug, currentSubsectionSlug
}) => (
    <RootFreezeProvider>
        <RootFreezeConsumer>
                {
                    ({rootIsFrozen, rootWithHiddenScroll}) => (
                        <Helmet
                            title={title[locale]}
                            meta={[
                                {name: 'description', content: description[locale]}
                            ]}
                        >
                            <html
                                lang={locale}
                                className={cn('b-root', {
                                    '__is-frozen': rootIsFrozen,
                                    '__scroll-is-hidden': rootWithHiddenScroll
                                })}
                            />
                        </Helmet>
                    )
                }
        </RootFreezeConsumer>
        <OrderedItemsProvider>
            <div className="b-page">
                <header className="page__header">
                    <Header
                        locale={locale}
                        pageName={pageName}
                        currentSectionSlug={currentSectionSlug}
                        currentSubsectionSlug={currentSubsectionSlug}
                    />
                </header>
                <section className="page__title">
                    <Title
                        pageTitle={pageTitle}
                        pageSubtitle={pageSubtitle}
                    />
                </section>
                <section className="page__content">
                    <div className="page__content-inner">
                        {children}
                    </div>
                </section>
                <footer className="page__footer">
                    <Footer />
                </footer>
            </div>
        </OrderedItemsProvider>
    </RootFreezeProvider>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pageTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    pageSubtitle: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    currentSectionSlug: PropTypes.string,
    currentSubsectionSlug: PropTypes.string
};

export default Layout;
