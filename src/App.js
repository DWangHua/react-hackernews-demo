import React, { Component } from 'react';
import Search from './Search';
import Table from './Table';
import './App.css';


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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list,
            searchTerm: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleClick(id) {
        const updatedList = this.state.list.filter(item => item.objectID !== id);
        this.setState({
            list: updatedList
        });
    }

    handleSearch(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

    render() {
        const { list, searchTerm } = this.state;
        return (
            <div className="App">
                <Search 
                    searchTerm={searchTerm}
                    handleSearch={this.handleSearch}
                >Search</Search>
                <Table
                    list={list}
                    pattern={searchTerm}
                    handleClick={this.handleClick}
                />
            </div>
        );
    }
}

export default App;
