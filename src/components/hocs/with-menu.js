import React, {Component} from 'react';
import Menu from '../menu';

export default (WrappedComponent) =>
    class WithMenu extends Component {
        constructor(props) {
            super(props);

            this.state = {
                menuIsVisible: false
            };

            this.showMenu = this.showMenu.bind(this);
            this.closeMenu = this.closeMenu.bind(this);
        }

        showMenu() {
            this.setState({menuIsVisible: true});
        }

        closeMenu() {
            this.setState({menuIsVisible: false});
        }

        render() {
            return (
                <>
                    <WrappedComponent
                        showMenu={this.showMenu}
                        menuIsVisible={this.state.menuIsVisible}
                        {...this.props}
                    />
                    <Menu
                        locale={this.props.locale}
                        pageName={this.props.pageName}
                        isVisible={this.state.menuIsVisible}
                        onRequestClose={this.closeMenu}
                    />
                </>
            );
        }
    }
