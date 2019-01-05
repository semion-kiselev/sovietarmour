import React, {PureComponent} from 'react';
import ShoppingCard from '../shopping-card';

export default (WrappedComponent) =>
    class WithShoppingCard extends PureComponent {
        constructor(props) {
            super(props);

            this.state = {
                shoppingCardIsVisible: false
            };

            this.showShoppingCard = this.showShoppingCard.bind(this);
            this.closeShoppingCard = this.closeShoppingCard.bind(this);
        }

        showShoppingCard() {
            this.setState({shoppingCardIsVisible: true});
        }

        closeShoppingCard() {
            this.setState({shoppingCardIsVisible: false});
        }

        render() {
            const {shoppingCardIsVisible} = this.state;

            return (
                <>
                    <WrappedComponent
                        showShoppingCard={this.showShoppingCard}
                        shoppingCardIsVisible={shoppingCardIsVisible}
                        {...this.props}
                    />
                    <ShoppingCard
                        locale={this.props.locale}
                        isVisible={shoppingCardIsVisible}
                        onRequestClose={this.closeShoppingCard}
                    />
                </>
            );
        }
    }
