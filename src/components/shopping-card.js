import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Overlay from './overlay';
import trans from '../lang';
import {withOrderedItemsConsumer} from '../contexts/ordered-items';
import {omit, request} from '../utils';
import {GENERIC_ANIMATION_TIMEOUT, NOTIFICATION_DISAPPEARANCE_DELAY, SHOPPING_FORM_NAME} from '../constants';

class ShoppingCard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            buyerName: '',
            buyerEmail: '',
            shippingAddress: '',
            formErrors: {},
            pendingSendingOrder: false,
            submitSucceed: false,
            submitFailed: false,
            notificationIsVisible: false
        };

        props.orderedItemsActions.setInitialItems();
        this.handleItemQtyDown = this.handleItemQtyDown.bind(this);
        this.handleItemQtyUp = this.handleItemQtyUp.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
        this.handleSubmitError = this.handleSubmitError.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(fieldName) {
        return (e) => {
            const {formErrors} = this.state;

            if (formErrors[fieldName]) {
                this.setState({
                    formErrors: omit(fieldName, formErrors)
                });
            }

            this.setState({
                [fieldName]: e.target.value
            });
        }
    }

    handleItemQtyDown(item) {
        return () => this.props.orderedItemsActions.removeItemFromOrder(item);
    }

    handleItemQtyUp(item) {
        return () => this.props.orderedItemsActions.addItemToOrder(item);
    }

    handleRemoveItem(item) {
        return () => this.props.orderedItemsActions.removeAllItemQtyFromOrder(item);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const {locale, orderedItems} = this.props;
        const {buyerName, buyerEmail, shippingAddress} = this.state;
        const normalizedItems = this.normalizeSubmitOrderedItems(orderedItems);

        const requestBody = {
            'form-name': SHOPPING_FORM_NAME,
            buyerName,
            buyerEmail,
            shippingAddress,
            items: JSON.stringify(normalizedItems)
        };

        this.setState({pendingSendingOrder: true});

        request(
            'POST',
            `/${locale}/`,
            {'Content-Type': 'application/x-www-form-urlencoded'},
            requestBody,
            this.handleSubmitSuccess,
            this.handleSubmitError
        )
    }

    hideNotificationWithTimeout() {
        setTimeout(() => this.setState({notificationIsVisible: false}), NOTIFICATION_DISAPPEARANCE_DELAY);
        setTimeout(
            () => this.setState({submitSucceed: false}),
            NOTIFICATION_DISAPPEARANCE_DELAY + GENERIC_ANIMATION_TIMEOUT
        );
    }

    handleSubmitSuccess() {
        this.props.onRequestClose();
        this.setState({
            buyerName: '',
            buyerEmail: '',
            shippingAddress: '',
            pendingSendingOrder: false,
            submitSucceed: true,
            notificationIsVisible: true
        });
        setTimeout(() => this.props.orderedItemsActions.removeAllItemsFromOrder(), GENERIC_ANIMATION_TIMEOUT);
        this.hideNotificationWithTimeout();
    }

    handleSubmitError() {
        this.setState({
            pendingSendingOrder: false,
            notificationIsVisible: true,
            submitFailed: true
        });
        this.hideNotificationWithTimeout();
    }

    validateForm() {
        const {locale} = this.props;
        const {buyerName, buyerEmail, shippingAddress} = this.state;
        const errors = {};

        if (buyerName.trim() === '') {
            errors['buyerName'] = trans.SHOPPING_FORM_BUYER_NAME_ERROR[locale];
        }

        if (buyerEmail.trim() === '') {
            errors['buyerEmail'] = trans.SHOPPING_FORM_BUYER_EMAIL_ERROR[locale];
        } else if (buyerEmail.indexOf('@') === -1) {
            errors['buyerEmail'] = trans.SHOPPING_FORM_BUYER_EMAIL_CORRECTION_ERROR[locale];
        }

        if (shippingAddress.trim() === '') {
            errors['shippingAddress'] = trans.SHOPPING_FORM_SHIPPING_ADDRESS_ERROR[locale];
        }

        if (Object.keys(errors).length) {
            this.setState({formErrors: errors});
            return false;
        }

        return true;
    }

    normalizeSubmitOrderedItems(items) {
        return items.map(({article, name, qty, price}) => ({
            article,
            name: name['ru'],
            qty,
            price
        }))
    }

    getTotalPrice() {
        const {orderedItems} = this.props;
        return orderedItems.reduce(
            (acc, item) => ((acc * 100 + item.price * item.qty * 100) / 100),
            0
        );
    }

    renderGuide() {
        const {locale} = this.props;

        return (
            <div
                className="shopping-card__guide"
                dangerouslySetInnerHTML={{__html: trans.SHOPPING_GUIDE[locale]}}
            />
        );
    }

    renderShoppingCard() {
        const {locale, orderedItems, onRequestClose} = this.props;
        const {buyerName, buyerEmail, shippingAddress, formErrors, pendingSendingOrder} = this.state;

        return (
            <div className="shopping-card__modal">
                <div className="shopping-card__modal-inner">
                    <div className="shopping-card__modal-header">
                        {trans.SHOPPING_YOUR_ORDER[locale]}
                    </div>

                    <div className="shopping-card__modal-body">
                        <div className="shopping-card__items">
                            {
                                orderedItems.map((item) => (
                                    <div className="shopping-card__item" key={item.article}>
                                        <div className="shopping-card__item-inner">
                                            <div className="shopping-card__item-name-info">
                                                <div className="shopping-card__item-name">{item.name[locale]}</div>
                                                <div className="shopping-card__item-article">
                                                    <span className="shopping-card__item-price-mobile">{item.price}$,</span>
                                                    {item.article}
                                                </div>
                                            </div>

                                            <div className="shopping-card__item-qty-price-info">
                                                <div className="shopping-card__item-qty">
                                                    <span
                                                        className="shopping-card__item-qty-down"
                                                        onClick={this.handleItemQtyDown(item)}
                                                    >-</span>
                                                    <span className="shopping-card__item-qty-value">{item.qty}</span>
                                                    <span
                                                        className="shopping-card__item-qty-up"
                                                        onClick={this.handleItemQtyUp(item)}
                                                    >+</span>
                                                </div>
                                                <div className="shopping-card__item-price">
                                                    <span>{item.price}$</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shopping-card__item-remove">
                                            <div
                                                className="shopping-card__item-remove-icon"
                                                onClick={this.handleRemoveItem(item)}
                                            >
                                                &times;
                                        </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="shopping-card__total">
                                {trans.SHOPPING_TOTAL[locale]}:&nbsp;
                            <span className="shopping-card__total-value">{this.getTotalPrice()}</span>$
                        </div>
                        </div>

                        <div
                            className="shopping-card__shipping-info"
                            dangerouslySetInnerHTML={{__html: trans.SHOPPING_SHIPPING_PRICE_INFO[locale]}}
                        />

                        <form
                            action="/"
                            method="post"
                            name={SHOPPING_FORM_NAME}
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                            className="shopping-card__modal-form"
                        >
                            <input type="hidden" name="form-name" value={SHOPPING_FORM_NAME} />
                            <div className="shopping-card__modal-form-row">
                                <label className="shopping-card__modal-form-label" htmlFor="buyerName">
                                    {trans.SHOPPING_YOUR_NAME[locale]}
                                    <span className="shopping-card__modal-form-required">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={cn('shopping-card__modal-form-input', {'__has-error': !!formErrors.buyerName})}
                                    name="buyerName"
                                    id="buyerName"
                                    maxLength="100"
                                    value={buyerName}
                                    onChange={this.onInputChange('buyerName')}
                                />
                                {
                                    formErrors.buyerName &&
                                    <div className="shopping-card__modal-form-error">{formErrors.buyerName}</div>
                                }
                            </div>
                            <div className="shopping-card__modal-form-row">
                                <label className="shopping-card__modal-form-label" htmlFor="buyerEmail">
                                    {trans.SHOPPING_YOUR_EMAIL[locale]}
                                    <span className="shopping-card__modal-form-required">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={cn('shopping-card__modal-form-input', {'__has-error': !!formErrors.buyerEmail})}
                                    name="buyerEmail"
                                    id="buyerEmail"
                                    maxLength="100"
                                    value={buyerEmail}
                                    onChange={this.onInputChange('buyerEmail')}
                                />
                                {
                                    formErrors.buyerEmail &&
                                    <div className="shopping-card__modal-form-error">{formErrors.buyerEmail}</div>
                                }
                            </div>
                            <div className="shopping-card__modal-form-row">
                                <label className="shopping-card__modal-form-label" htmlFor="shippingAddress">
                                    {trans.SHOPPING_YOUR_SHIPPING_ADDRESS[locale]}
                                    <span className="shopping-card__modal-form-required">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={cn('shopping-card__modal-form-input', {'__has-error': !!formErrors.shippingAddress})}
                                    name="shippingAddress"
                                    id="shippingAddress"
                                    maxLength="100"
                                    value={shippingAddress}
                                    onChange={this.onInputChange('shippingAddress')}
                                />
                                {
                                    formErrors.shippingAddress &&
                                    <div className="shopping-card__modal-form-error">{formErrors.shippingAddress}</div>
                                }
                            </div>
                            <div className="shopping-card__modal-form-row">
                                <button
                                    className={cn('shopping-card__modal-form-btn', '__submit', '__right', {
                                        '__pending': pendingSendingOrder
                                    })}
                                    onClick={this.handleSubmit}
                                >
                                    {
                                        pendingSendingOrder
                                            ? <div className="lds-dual-ring"></div>
                                            : trans.BUTTON_SUBMIT[locale]
                                    }
                                </button>
                                <button
                                    className="shopping-card__modal-form-btn __close __right"
                                    onClick={onRequestClose}
                                    type="button"
                                >
                                    {trans.BUTTON_CLOSE[locale]}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {locale, isVisible, onRequestClose, orderedItems} = this.props;
        const {submitSucceed, submitFailed, notificationIsVisible} = this.state;

        return (
            <>
                <Overlay
                    isVisible={isVisible}
                    onRequestClose={onRequestClose}
                    closeOnOverlayClick
                    enableOverlayScroll={orderedItems.length > 0}
                    enableRootFreeze
                >
                    <div className="b-shopping-card">
                        {
                            orderedItems.length
                                ? this.renderShoppingCard()
                                : this.renderGuide()
                        }
                    </div>
                </Overlay>
                <div className={cn('b-notification', {
                    '__success': submitSucceed,
                    '__error': submitFailed,
                    '__is-visible': notificationIsVisible
                })}>
                    {
                        submitSucceed
                            ? trans.SHOPPING_SENDING_ORDER_SUCCESS[locale]
                            : trans.SHOPPING_SENDING_ORDER_ERROR[locale]
                    }
                </div>
            </>
        );
    }
}

ShoppingCard.propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    locale: PropTypes.string.isRequired,
    orderedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    orderedItemsActions: PropTypes.object.isRequired
};

export default withOrderedItemsConsumer(ShoppingCard);
