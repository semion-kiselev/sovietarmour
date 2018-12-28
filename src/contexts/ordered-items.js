import React, {Component, createContext} from 'react';
import {LS_ORDER_ITEMS_KEY} from '../constants';

const {Provider, Consumer} = createContext();

class OrderedItemsProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderedItems: []
        };

        this.addItemToOrder = this.addItemToOrder.bind(this);
        this.removeItemFromOrder = this.removeItemFromOrder.bind(this);
        this.removeAllItemQtyFromOrder = this.removeAllItemQtyFromOrder.bind(this);
        this.removeAllItemsFromOrder = this.removeAllItemsFromOrder.bind(this);
        this.setInitialItems = this.setInitialItems.bind(this);
    }

    setInitialItems() {
        const items = this.getOrderedItemsFromLocalStorage();

        if (items) {
            try {
                const orderedItems = JSON.parse(items);
                if (!Array.isArray(orderedItems)) {
                    this.removeOrderedItemsFromLocalStorage();
                    return;
                }
                this.setState({orderedItems});
            } catch (e) {
                this.removeOrderedItemsFromLocalStorage();
            }
        }
    }

    addItemToOrder(itemToAdd) {
        const {orderedItems} = this.state;
        let sameItemWasFound = false;

        const mappedOrderedItems = orderedItems.map(item => {
            if (item.article === itemToAdd.article) {
                sameItemWasFound = true;
                return {...item, qty: item.qty + 1}
            }
            return item;
        });

        const itemsToSave = sameItemWasFound
            ? mappedOrderedItems
            : [...orderedItems, {...itemToAdd, qty: 1}];

        this.setState({orderedItems: itemsToSave});
        this.saveOrderedItemsToLocalStorage(itemsToSave);
    }

    removeItemFromOrder(itemToRemove) {
        const {orderedItems} = this.state;
        let severalSameItemsWereFound = false;

        const mappedOrderedItems = orderedItems.map(item => {
            if (item.article === itemToRemove.article && item.qty > 1) {
                severalSameItemsWereFound = true;
                return {...item, qty: item.qty - 1}
            }
            return item;
        });

        const itemsToSave = severalSameItemsWereFound
            ? mappedOrderedItems
            : orderedItems.filter(item => (item.article !== itemToRemove.article));

        this.setState({orderedItems: itemsToSave});
        this.saveOrderedItemsToLocalStorage(itemsToSave);
    }

    removeAllItemQtyFromOrder(itemToRemove) {
        const orderedItems = this.state.orderedItems.filter(item => (item.article !== itemToRemove.article));
        this.setState({orderedItems});
        this.saveOrderedItemsToLocalStorage(orderedItems);
    }

    removeAllItemsFromOrder() {
        this.setState({orderedItems: []});
        this.removeOrderedItemsFromLocalStorage();
    }

    getOrderedItemsFromLocalStorage() {
        return localStorage.getItem(LS_ORDER_ITEMS_KEY);
    }

    saveOrderedItemsToLocalStorage(items) {
        localStorage.setItem(LS_ORDER_ITEMS_KEY, JSON.stringify(items));
    }

    removeOrderedItemsFromLocalStorage() {
        return localStorage.removeItem(LS_ORDER_ITEMS_KEY);
    }

    render() {
        return (
            <Provider value={{
                ...this.state,
                actions: {
                    setInitialItems: this.setInitialItems,
                    addItemToOrder: this.addItemToOrder,
                    removeItemFromOrder: this.removeItemFromOrder,
                    removeAllItemQtyFromOrder: this.removeAllItemQtyFromOrder,
                    removeAllItemsFromOrder: this.removeAllItemsFromOrder
                }
            }}>
                {this.props.children}
            </Provider>
        );
    }
}

const withOrderedItemsConsumer = (WrappedComponent) =>
    class WithOrderedItemsConsumer extends Component {
        render() {
            return (
                <Consumer>
                    {
                        ({orderedItems, actions}) => (
                            <WrappedComponent
                                orderedItems={orderedItems}
                                orderedItemsActions={actions}
                                {...this.props}
                            />
                        )
                    }
                </Consumer>
            );
        }
    }

export {
    OrderedItemsProvider,
    Consumer as OrderedItemsConsumer,
    withOrderedItemsConsumer
}
