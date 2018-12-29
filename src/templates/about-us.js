import React from 'react';
import Layout from '../components/layout';
import {pageNames} from '../constants';
import trans from '../lang';

const AboutUs = (props) => {
    const {locale} = props.pageContext;

    return (
        <Layout
            locale={locale}
            title={trans.ABOUT_US_HEAD_TITLE[locale]}
            description={trans.ABOUT_US_HEAD_DESCRIPTION[locale]}
            pageTitle={trans.ABOUT_US_PAGE_TITLE[locale]}
            pageSubtitle=""
            pageName={pageNames.ABOUT_US}
        >
            <div className="b-content">
                <div className="content__inner">
                    <section className="content__section">
                        <p className="content__paragraph">
                            {trans.ABOUT_US_WHAT_IS_SA[locale]}
                        </p>
                    </section>
                    <section className="content__section">
                        <p className="content__paragraph">
                            {trans.ABOUT_US_OUR_TARGET[locale]}
                        </p>
                    </section>
                    <section className="content__section">
                        <p className="content__paragraph">
                            {trans.ABOUT_US_OTHER_COUNTRIES_MODELS[locale]}
                        </p>
                    </section>
                    <section className="content__section">
                        <p
                            className="content__paragraph"
                            dangerouslySetInnerHTML={{__html: trans.ABOUT_US_WRUTE_TO_US[locale]}}
                        />
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default AboutUs;
