import React, { Component } from 'react';


class Search extends Component {
    render() {
        const { searchTerm, handleSearch, children } = this.props;
        return (
            <form>
                {children}<input 
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </form>
        );
    }
}

export default Search;