import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {navigate} from 'gatsby';
import {Location} from '@reach/router';
import cn from 'classnames';
import Overlay from './overlay';

import {locales, NETLIFY_LOCALE_COOKIE_NAME} from '../constants';
import {setCookie} from '../utils';

class Locales extends PureComponent {
    constructor(props) {
        super(props);

        this.changeLocale = this.changeLocale.bind(this);
    }

    changeLocale(locale, {pathname}) {
        const {locale: currentLocale} = this.props;
        return () => {
            if (locale === currentLocale) {
                return;
            }

            setCookie(NETLIFY_LOCALE_COOKIE_NAME, locale, {path: '/',expires: 5184000});

            const localeReg = new RegExp(`/${currentLocale}`);
            const newLocation = pathname.replace(localeReg, `/${locale}`)
            navigate(newLocation);
        }
    }

    render() {
        const {locale: currentLocale, isVisible, onRequestClose} = this.props;

        return (
            <div className="b-locales">

                <Overlay
                    isVisible={isVisible}
                    onRequestClose={onRequestClose}
                    closeOnOverlayClick
                    enableRootFreeze
                >
                    <div className="locales__items">
                        <Location>
                            {({location}) => (
                                <div className="locales__items-inner">
                                    {
                                        locales.map(locale => (
                                            <div
                                                key={locale}
                                                className={cn('locales__item', {'__is-active': locale === currentLocale})}
                                                onClick={this.changeLocale(locale, location)}
                                            >
                                                {locale}
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </Location>
                    </div>
                </Overlay>
            </div>
        );
    }
}

Locales.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired
};

export default Locales;
