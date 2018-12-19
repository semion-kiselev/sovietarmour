import React, {PureComponent} from 'react';
import {Link} from 'gatsby';
import cn from 'classnames';
import Modal from './modal';
import MenuIcon from './icons/menu';
import {getNavData} from '../utils';

export default class Menu extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            menuItemsIsVisible: false
        };

        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        this.setState({menuItemsIsVisible: true});
    }

    closeModal() {
        this.setState({menuItemsIsVisible: false});
    }

    render() {
        const {locale, pageName: currentPage} = this.props;
        const {menuItemsIsVisible} = this.state;
        const navData = getNavData(locale);

        return (
            <div className="b-menu">
                <i className="icon" onClick={this.showModal}>
                    <MenuIcon />
                </i>
                <Modal
                    isVisible={menuItemsIsVisible}
                    onRequestClose={this.closeModal}
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
                </Modal>
            </div>
        );
    }
}
