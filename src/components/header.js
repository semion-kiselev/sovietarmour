import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Logo from './logo';
import Utils from './utils';
import Nav from './nav';

class Header extends PureComponent {
    render() {
        const {locale, pageName, currentSectionSlug, currentSubsectionSlug} = this.props;

        return (
            <div className="b-header">
                <div className="header__logo">
                    <Logo locale={locale} />
                </div>
                <div className="header__utils">
                    <Utils
                        locale={locale}
                        pageName={pageName}
                        currentSectionSlug={currentSectionSlug}
                        currentSubsectionSlug={currentSubsectionSlug}
                    />
                </div>
                <div className="header__nav">
                    <Nav
                        locale={locale}
                        pageName={pageName}
                        currentSectionSlug={currentSectionSlug}
                        currentSubsectionSlug={currentSubsectionSlug}
                    />
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    locale: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    currentSectionSlug: PropTypes.string,
    currentSubsectionSlug: PropTypes.string
};

export default Header;
