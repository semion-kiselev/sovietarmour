import React, {PureComponent} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import SearchIcon from './icons/search';
import SidebarIcon from './icons/sidebar';
import MenuIcon from './icons/menu';
import LocaleIcon from './icons/locale';
import withSidebar from './hocs/with-sidebar';
import withMenu from './hocs/with-menu';
import withLocales from './hocs/with-locales';

class Utils extends PureComponent {
    render() {
        const {showSidebar, showMenu, showLocales, sidebarIsVisible, menuIsVisible, localesAreVisible} = this.props;

        return (
            <>
                <div className="b-utils">
                    <ul className="utils__list">
                        <li className={cn('utils__item', '__menu', {'__is-active': menuIsVisible})}>
                            <i className="icon" onClick={showMenu}>
                                <MenuIcon />
                            </i>
                        </li>
                        <li className={cn('utils__item', '__locale', {'__is-active': localesAreVisible})}>
                            <i className="icon" onClick={showLocales}>
                                <LocaleIcon />
                            </i>
                        </li>
                        <li className="utils__item __search">
                            <i className="icon">
                                <SearchIcon />
                            </i>
                        </li>
                        <li className="utils__item __shopping">
                            {/* shopping-card */}
                        </li>
                        <li className={cn('utils__item', '__sidebar', {'__is-active': sidebarIsVisible})}>
                            <i className="icon" onClick={showSidebar}>
                                <SidebarIcon />
                            </i>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

Utils.propTypes = {
    locale: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    showSidebar: PropTypes.func.isRequired,
    sidebarIsVisible: PropTypes.bool.isRequired,
    showMenu: PropTypes.func.isRequired,
    menuIsVisible: PropTypes.bool.isRequired,
    showLocales: PropTypes.func.isRequired,
    localesAreVisible: PropTypes.bool.isRequired
}

export default withLocales(withMenu(withSidebar(Utils)));
