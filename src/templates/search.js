import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Layout from '../components/layout';
import Cards from '../components/cards';
import {
    pageNames, locales, SEARCH_INPUT_MAX_LENGTH, SEARCH_ITEMS_MAX_QTY, SEARCH_INPUT_DEBOUNCE_DELAY
} from '../constants';
import trans from '../lang';
import {request} from '../utils';

class Search extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            error: null,
            items: []
        };

        this.input = createRef();
        this.handleQuery = this.handleQuery.bind(this);
        this.handleQuerySuccess = this.handleQuerySuccess.bind(this);
        this.handleQueryError = this.handleQueryError.bind(this);
    }

    componentDidMount() {
        this.input.current.focus();
    }

    requestItems = debounce(
        () => request('GET', '/items.json', null, null, this.handleQuerySuccess, this.handleQueryError),
        SEARCH_INPUT_DEBOUNCE_DELAY
    );

    handleQuerySuccess(itemsJsonString) {
        const {query} = this.state;

        if (query.length === 0) {
            return;
        }

        const items = JSON.parse(itemsJsonString);

        if (!Array.isArray(items) || items.length === 0) {
            this.setState({
                error: true,
                items: []
            });
            return;
        }

        const q = query.toLowerCase();

        const filteredItems = items.filter(({article, name, visible}) => (
            (article.toLowerCase().indexOf(q) > -1 ||
            locales.some(locale => name[locale].toLowerCase().indexOf(q) > -1)) &&
            visible
        ))

        if (filteredItems.length === 0) {
            this.setState({items: []});
            return;
        }

        this.setState({items: filteredItems.slice(0, SEARCH_ITEMS_MAX_QTY)});
    }

    handleQueryError() {
        this.setState({error: true});
    }

    handleQuery(e) {
        const query = e.target.value;
        this.setState({query});

        if (query.trim().length === 0) {
            this.setState({
                query: '',
                items: []
            });
            return;
        }

        this.requestItems();
    }

    render() {
        const {locale} = this.props.pageContext;
        const {query, items, error} = this.state;

        return (
            <Layout
                locale={locale}
                title={trans.SEARCH_HEAD_TITLE[locale]}
                description={trans.SEARCH_HEAD_DESCRIPTION[locale]}
                pageTitle={
                    <div className="b-search">
                        <input
                            ref={this.input}
                            className="search__input"
                            type="text"
                            placeholder={trans.SEARCH_PAGE_TITLE[locale]}
                            name="searchInput"
                            maxLength={SEARCH_INPUT_MAX_LENGTH}
                            value={query}
                            onChange={this.handleQuery}
                        />
                    </div>
                }
                pageSubtitle=""
                pageName={pageNames.SEARCH}
            >
                <div className="b-content">
                    {
                        error && <div className="content__paragraph">{trans.SEARCH_ERROR[locale]}</div>
                    }
                    {
                        items.length > 0
                            ? <Cards
                                cards={items}
                                locale={locale}
                            />
                            : <div className="content__paragraph">{trans.SEARCH_NO_RESULTS[locale]}</div>
                    }
                </div>
            </Layout>
        );
    }
}

Search.propTypes = {
    pageContext: PropTypes.object.isRequired
};

export default Search;
