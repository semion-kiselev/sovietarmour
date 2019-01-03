import React, {PureComponent} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';
import {pageNames} from '../constants';
import SearchIcon from './icons/search';
import SidebarIcon from './icons/sidebar';
import MenuIcon from './icons/menu';
import LocaleIcon from './icons/locale';
import ShoppingIcon from './icons/shopping';
import withSidebar from './hocs/with-sidebar';
import withMenu from './hocs/with-menu';
import withLocales from './hocs/with-locales';
import withShoppingCard from './hocs/with-shopping-card';
import {withOrderedItemsConsumer} from '../contexts/ordered-items';
import {getOrderedItemsQty} from '../utils';

class Utils extends PureComponent {
    render() {
        const {
            showSidebar, showMenu, showLocales, showShoppingCard, orderedItems, locale, pageName,
            sidebarIsVisible, menuIsVisible, localesAreVisible, shoppingCardIsVisible
        } = this.props;
        const orderedItemsQty = getOrderedItemsQty(orderedItems);

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
                        <li className={cn('utils__item', '__search', {'__is-active': pageName === pageNames.SEARCH})}>
                            <Link to={`/${locale}/search`} className="icon">
                                <SearchIcon />
                            </Link>
                        </li>
                        <li className={cn('utils__item', '__shopping', {'__is-active': shoppingCardIsVisible})}>
                            <i className="b-shopping-card icon" onClick={showShoppingCard}>
                                <ShoppingIcon />
                                <span
                                    className="shopping-card__items-circle"
                                    style={{display: orderedItemsQty ? 'block' : 'none'}}
                                >
                                    <span className="shopping-card__items-num">
                                        {orderedItemsQty}
                                    </span>
                                </span>
                            </i>
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
    localesAreVisible: PropTypes.bool.isRequired,
    showShoppingCard: PropTypes.func.isRequired,
    shoppingCardIsVisible: PropTypes.bool.isRequired,
    orderedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    orderedItemsActions: PropTypes.object.isRequired
}

export default withOrderedItemsConsumer(withShoppingCard(withLocales(withMenu(withSidebar(Utils)))));
