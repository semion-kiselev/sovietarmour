import React from 'react';
import Menu from './menu';
import Locales from './locales';
import SearchIcon from './icons/search';
import SidebarIcon from './icons/sidebar';

export default ({locale, pageName}) => (
    <div className="b-utils">
        <ul className="utils__list">
            <li className="utils__item __menu">
                <Menu
                    locale={locale}
                    pageName={pageName}
                />
            </li>
            <li className="utils__item __locale">
                <Locales locale={locale} />
            </li>
            <li className="utils__item __search">
                <i className="icon">
                    <SearchIcon />
			    </i>
            </li>
            <li className="utils__item __shopping">
                {/* shopping-card */}
            </li>
            <li className="utils__item __sidebar">
                <i className="icon">
                    <SidebarIcon />
			    </i>
            </li>
        </ul>
    </div>
);
