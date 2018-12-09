import '../styles/index.scss';
import React from 'react';
import Helmet from 'react-helmet';
import Header from './header';

const Layout = ({children, locale, title, description}) => (
    <>
        <Helmet
            title={title[locale]}
            meta={[
                {name: 'description', content: description[locale]}
            ]}
        >
            <html lang={locale} />
        </Helmet>
        <Header locale={locale} />
        <div>
            {children}
        </div>
    </>
);

export default Layout;
