import '../styles/index.scss';
import React from 'react';
import Helmet from 'react-helmet';
import Header from './header';
import Footer from './footer';
import Title from './title';

const Layout = ({children, locale, title, description, pageName, pageTitle, pageSubtitle}) => (
    <>
        <Helmet
            title={title[locale]}
            meta={[
                {name: 'description', content: description[locale]}
            ]}
        >
            <html lang={locale} />
        </Helmet>
        <div className="b-page">
            <header className="page__header">
                <Header
                    locale={locale}
                    pageName={pageName}
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
    </>
);

export default Layout;
