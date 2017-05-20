import React, { Component } from 'react';
// import Search from './Search';
// import Table from './Table';
import './App.css';


const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    }
];

const search = (searchText) => 
    (item) => !searchText || item.title.toLowerCase().includes(searchText.toLowerCase());

const Search = ({ searchTerm, handleSearch, children, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
        <input 
            type='text'
            value={searchTerm}
            onChange={handleSearch}
        />
        <button type='submit'>
            {children}
        </button>
    </form>
);

const Button = ({ handleClick, className = '', children}) => (
     <button
        onClick={handleClick}
        className={className}
        type='button'>
        {children}
    </button>
);

const Table = ({ list, handleClick }) => (
    <div className='table'>
        {list.map(item => (
                <div key={item.objectID} className='table-row'>
                    <span style={{ width: '40%' }}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={{ width: '30%' }}>{item.author}</span>
                    <span style={{ width: '10%' }}>{item.num_comments}</span>
                    <span style={{ width: '10%' }}>{item.points}</span>
                    <span style={{ width: '10%' }}>
                        <Button className='button-inline' handleClick={() => handleClick(item.objectID)}>Delete</Button>
                    </span>
                </div>
            ))
        }
    </div>
);


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
            searchTerm: DEFAULT_QUERY,
            result: null
        };
        this._setSearchResultToState = this._setSearchResultToState.bind(this);
        this._fetchSearchResult = this._fetchSearchResult.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _setSearchResultToState(result) {
        const { hits, page } = result;
        const oldHits = page === 0 ? [] : this.state.result.hits;

        const updatedHits = [...oldHits, ...hits];
        this.setState({
            result: {
                hits: updatedHits,
                page
            }
        });
    }

    _fetchSearchResult(searchTerm, page) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(res => res.json())
            .then(this._setSearchResultToState);
    }

    // _fetchNextPage(searchTerm, page, step) {
    //     return (searchTerm) => {
    //         this._fetchSearchResult(searchTerm, page + step);
    //     }
    // }

    handleClick(id) {
        const updatedList = this.state.result.hits.filter(item => item.objectID !== id);
        // const updatedHits = {hits: updatedList};
        this.setState({
            result: {
                ...this.state.result,
                hits: updatedList
            }
        });
    }

    handleSearch(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

    handleSubmit(e) {
        const { searchTerm } = this.state;
        this._fetchSearchResult(searchTerm, DEFAULT_PAGE);
        e.preventDefault();
    }

    componentDidMount() {
        const { searchTerm } = this.state;
        this._fetchSearchResult(searchTerm, DEFAULT_PAGE);
    }

    render() {
        const { result, searchTerm } = this.state;
        const page = (result && result.page) || 0;
        return ( 
            <div className='page'>
                <div className='interactions'>
                    <Search 
                        searchTerm={searchTerm}
                        handleSearch={this.handleSearch}
                        handleSubmit={this.handleSubmit}
                    >Search</Search>
                </div>
                    { result && 
                         <Table
                            list={result.hits}
                            handleClick={this.handleClick}
                        />
                    }
                <div className="interactions">
                    <Button handleClick={() => this._fetchSearchResult(searchTerm, page + 1)}>More</Button>
                </div>
                    
            </div>
            );
    }
}

export default App;
