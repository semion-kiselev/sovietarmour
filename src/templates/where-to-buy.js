import React from 'react';
import Layout from '../components/layout';
import {pageNames} from '../constants';
import trans from '../lang';

const WhereToBuy = (props) => {
    const {locale} = props.pageContext;

    return (
        <Layout
            locale={locale}
            title={trans.WHERE_TO_BUY_HEAD_TITLE[locale]}
            description={trans.WHERE_TO_BUY_HEAD_DESCRIPTION[locale]}
            pageTitle={trans.WHERE_TO_BUY_PAGE_TITLE[locale]}
            pageSubtitle=""
            pageName={pageNames.WHERE_TO_BUY}
        >
            <div className="b-content">
                <div className="content__inner">
                    <section className="content__section">
                        <p className="content__paragraph">
                            {trans.WHERE_TO_BUY_ORDER_RULE[locale]}
                        </p>
                    </section>

                    <section className="content__section">
                        <h2 className="content__subheader">{trans.WHERE_TO_BUY_MOSCOW[locale]}</h2>
                        <p className="content__paragraph">{trans.WHERE_TO_BUY_SHOP_TM[locale]}</p>
                        <p className="content__paragraph">{trans.WHERE_TO_BUY_SHOP_LC[locale]}</p>
                        <p className="content__paragraph">{trans.WHERE_TO_BUY_SHOP_MODELLMIX[locale]}</p>
                    </section>

                    <section className="content__section">
                        <h2 className="content__subheader">{trans.WHERE_TO_BUY_PETERSBURG[locale]}</h2>
                        <p className="content__paragraph">{trans.WHERE_TO_BUY_SHOP_43_48[locale]}</p>
                    </section>

                    <section className="content__section">
                        <h2 className="content__subheader">{trans.WHERE_TO_BUY_ATTENTION[locale]}</h2>
                        <p
                            className="content__paragraph"
                            style={{display: locale === 'ru' ? 'none' : 'block'}}
                        >
                            Please, be informed, that the models are hand made from plastic or resin kits.
				        </p>

                        <p className="content__paragraph">{trans.WHERE_TO_BUY_SA_ARTICLE[locale]}</p>
                        <p className="content__paragraph">{trans.WHERE_TO_BUY_OTHER_ARTICLES[locale]}</p>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default WhereToBuy;
