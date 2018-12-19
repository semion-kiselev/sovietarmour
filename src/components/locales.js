import React, {PureComponent} from 'react';
import {navigate, Location} from '@reach/router';
import cn from 'classnames';
import Modal from './modal';
import LocaleIcon from './icons/locale';
import {locales} from '../constants';
import {setCookie} from '../utils';

export default class Locale extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            localesIsVisible: false
        };

        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.changeLocale = this.changeLocale.bind(this);
    }

    showModal() {
        this.setState({localesIsVisible: true});
    }

    closeModal() {
        this.setState({localesIsVisible: false});
    }

    changeLocale(locale, {pathname}) {
        const {locale: currentLocale} = this.props;
        return () => {
            if (locale === currentLocale) {
                return;
            }

            setCookie('nf_locale', locale, {path: '/',expires: 5184000});

            const localeReg = new RegExp(`/${currentLocale}`);
            const newLocation = pathname.replace(localeReg, `/${locale}`)
            navigate(newLocation);
        }
    }

    render() {
        const {locale: currentLocale} = this.props;
        const {localesIsVisible} = this.state;

        return (
            <div className="b-locales">
                <i className="icon" onClick={this.showModal}>
                    <LocaleIcon />
                </i>
                <Modal
                    isVisible={localesIsVisible}
                    onRequestClose={this.closeModal}
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
                </Modal>
            </div>
        );
    }
}
