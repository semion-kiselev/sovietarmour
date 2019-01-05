import React, {PureComponent} from 'react';
import Locales from '../locales';

export default (WrappedComponent) =>
    class WithLocales extends PureComponent {
        constructor(props) {
            super(props);

            this.state = {
                localesAreVisible: false
            };

            this.showLocales = this.showLocales.bind(this);
            this.closeLocales = this.closeLocales.bind(this);
        }

        showLocales() {
            this.setState({localesAreVisible: true});
        }

        closeLocales() {
            this.setState({localesAreVisible: false});
        }

        render() {
            return (
                <>
                    <WrappedComponent
                        showLocales={this.showLocales}
                        localesAreVisible={this.state.localesAreVisible}
                        {...this.props}
                    />
                    <Locales
                        locale={this.props.locale}
                        isVisible={this.state.localesAreVisible}
                        onRequestClose={this.closeLocales}
                    />
                </>
            );
        }
    }
