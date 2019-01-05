import '../styles/index.scss';
import React, {PureComponent} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from './header';
import Footer from './footer';
import Title from './title';
import {OrderedItemsProvider} from '../contexts/ordered-items';
import {RootFreezeProvider, RootFreezeConsumer} from '../contexts/root-freeze';
import trans from '../lang';
import {SHOPPING_FORM_NAME} from '../constants';

class Layout extends PureComponent {
    render() {
        const {
            children, locale, title, description, pageName, pageTitle, pageSubtitle,
            currentSectionSlug, currentSubsectionSlug
        } = this.props;

        return (
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

                                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                                <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
                                <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
                                <link rel="manifest" href="/favicons/manifest.json" />
                                <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#d30609" />
                                <link rel="shortcut icon" href="/favicons/favicon.ico" />
                                <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
                                <meta name="theme-color" content="#ffffff" />

                                <script>
                                    {`
                                    var ua = window.navigator.userAgent;
                                    var msie = ua.indexOf('MSIE');
                                    if (msie > 0) {
                                        alert("${trans.OLD_BROWSER_WARN[locale]}");
                                    }
                                `}
                                </script>
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
                        <form name={SHOPPING_FORM_NAME} netlify netlify-honeypot="bot-field" style={{display: 'none'}}>
                            <input type="text" name="buyerName" />
                            <input type="text" name="buyerEmail" />
                            <input type="text" name="shippingAddress" />
                            <input type="text" name="items" />
                        </form>
                    </div>
                </OrderedItemsProvider>
            </RootFreezeProvider>
        );
    }
}

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
