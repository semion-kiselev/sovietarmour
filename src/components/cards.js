import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import Overlay from './overlay';
import Loupe from './loupe';
import {IMAGE_URL, IMAGE_BIG} from '../constants';
import {withOrderedItemsConsumer} from '../contexts/ordered-items';

class Cards extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            viewedImage: undefined
        };

        this.handleLoupe = this.handleLoupe.bind(this);
        this.handleItemOrder = this.handleItemOrder.bind(this);
        this.clearViewedImage = this.clearViewedImage.bind(this);
    }

    handleLoupe(image) {
        return () => this.setState({viewedImage: image});
    }

    handleItemOrder(item) {
        return () => this.props.orderedItemsActions.addItemToOrder(item);
    }

    clearViewedImage() {
        this.setState({viewedImage: undefined});
    }

    render() {
        const {cards, locale} = this.props;
        const {viewedImage} = this.state;

        return (
            <>
                <div className="b-cards">
                    {
                        cards.map(({node: item}) => (
                            <div
                                key={item.article}
                                className="cards__item"
                            >
                                <Card
                                    item={item}
                                    locale={locale}
                                    onLoupe={this.handleLoupe(`${IMAGE_URL}/${IMAGE_BIG}/${item.image}`)}
                                    onOrder={this.handleItemOrder(item)}
                                />
                            </div>
                        ))
                    }
                </div>
                <Overlay
                    isVisible={Boolean(viewedImage)}
                    onRequestClose={this.clearViewedImage}
                    closeOnOverlayClick
                >
                    {
                        Boolean(viewedImage) &&
                            <Loupe
                                image={viewedImage}
                                onRequestClose={this.clearViewedImage}
                             />
                    }
                </Overlay>
            </>
        );
    }
}

Cards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    locale: PropTypes.string.isRequired,
    orderedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    orderedItemsActions: PropTypes.object.isRequired
};

export default withOrderedItemsConsumer(Cards);
