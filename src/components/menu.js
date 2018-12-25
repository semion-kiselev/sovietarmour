import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';
import cn from 'classnames';
import Overlay from './overlay';
import {getNavData} from '../utils';

const Menu = ({locale, pageName: currentPage, isVisible, onRequestClose}) => {
    const navData = getNavData(locale);

    return (
        <div className="b-menu">
            <Overlay
                isVisible={isVisible}
                onRequestClose={onRequestClose}
            >
                <div className="menu__items">
                    {
                        navData.map(({path, pageName, label}) => (
                            <div key={pageName} className="menu__item">
                                <Link
                                    to={path}
                                    className="menu__link"
                                >
                                    <button className={cn('menu__btn', {'__is-active': pageName === currentPage})}>
                                        {label}
                                    </button>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </Overlay>
        </div>
    );
}

Menu.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired
}

export default Menu;
