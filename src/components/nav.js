import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';
import cn from 'classnames';
import withSidebar from './hocs/with-sidebar';
import {getNavData} from '../utils';
import trans from '../lang';

class Nav extends PureComponent {
    render() {
        const {locale, pageName: currentPage, showSidebar, sidebarIsVisible} = this.props;
        const navData = getNavData(locale);

        return (
            <nav className="b-nav">
                <ul className="nav__list">
                    {
                        navData.map(({path, pageName, label}) => (
                            <li key={pageName} className="nav__item">
                                <Link
                                    className={cn('nav__link', {'__is-active': pageName === currentPage})}
                                    to={path}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))
                    }
                    <li className="nav__item">
                        <span
                            className={cn('nav__link', {'__is-active': sidebarIsVisible})}
                            onClick={showSidebar}
                        >
                            {trans.NAV_CATALOG[locale]}
                        </span>
                    </li>
                </ul>
            </nav>
        );
    }
}

Nav.propTypes = {
    locale: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    showSidebar: PropTypes.func.isRequired,
    sidebarIsVisible: PropTypes.bool.isRequired
}

export default withSidebar(Nav);
