import React, {Component, createContext} from 'react';

const {Provider, Consumer} = createContext();

class RootFreezeProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rootIsFrozen: false,
            rootWithHiddenScroll: false
        };

        this.freezeRoot = this.freezeRoot.bind(this);
        this.defrostRoot = this.defrostRoot.bind(this);
        this.hideRootScroll = this.hideRootScroll.bind(this);
        this.showRootScroll = this.showRootScroll.bind(this);
    }

    freezeRoot() {
        this.setState({rootIsFrozen: true});
    }

    defrostRoot() {
        this.setState({rootIsFrozen: false});
    }

    hideRootScroll() {
        this.setState({rootWithHiddenScroll: true});
    }

    showRootScroll() {
        this.setState({rootWithHiddenScroll: false});
    }

    render() {
        return (
            <Provider value={{
                ...this.state,
                actions: {
                    freezeRoot: this.freezeRoot,
                    defrostRoot: this.defrostRoot,
                    hideRootScroll: this.hideRootScroll,
                    showRootScroll: this.showRootScroll
                }
            }}>
                {this.props.children}
            </Provider>
        );
    }
}

const withRootFreezeConsumer = (WrappedComponent) =>
    class WithOrderedItemsConsumer extends Component {
        render() {
            return (
                <Consumer>
                    {
                        ({rootIsFrozen, rootWithHiddenScroll, actions}) => (
                            <WrappedComponent
                                rootIsFrozen={rootIsFrozen}
                                rootWithHiddenScroll={rootWithHiddenScroll}
                                rootFreezeActions={actions}
                                {...this.props}
                            />
                        )
                    }
                </Consumer>
            );
        }
    }

export {
    RootFreezeProvider,
    Consumer as RootFreezeConsumer,
    withRootFreezeConsumer
}
