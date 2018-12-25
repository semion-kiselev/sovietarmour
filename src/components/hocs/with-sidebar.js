import React, {Component} from 'react';
import Sidebar from '../sidebar';

export default (WrappedComponent) =>
    class WithSidebar extends Component {
        constructor(props) {
            super(props);

            this.state = {
                sidebarIsVisible: false
            };

            this.showSidebar = this.showSidebar.bind(this);
            this.closeSidebar = this.closeSidebar.bind(this);
        }

        showSidebar() {
            this.setState({sidebarIsVisible: true});
        }

        closeSidebar() {
            this.setState({sidebarIsVisible: false});
        }

        render() {
            return (
                <>
                    <WrappedComponent
                        showSidebar={this.showSidebar}
                        sidebarIsVisible={this.state.sidebarIsVisible}
                        {...this.props}
                    />
                    <Sidebar
                        locale={this.props.locale}
                        isVisible={this.state.sidebarIsVisible}
                        onRequestClose={this.closeSidebar}
                    />
                </>
            );
        }
    }
