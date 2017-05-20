import React, { Component } from 'react';
import Button from './Button';

function search(searchText) {
    return function(item) {
        return !searchText || item.title.toLowerCase().includes(searchText.toLowerCase());
    }
}

class Table extends Component {
    render() {
        const { list, pattern, handleClick } = this.props;
        return (
            <div>
                {list.filter(search(pattern))
                    .map(item => (
                        <div key={item.objectID}>
                            <span>
                                <a href={item.url}>{item.title}</a>
                            </span>
                            <span>{item.author}</span>
                            <span>{item.num_comments}</span>
                            <span>{item.points}</span>
                            <span>
                                <Button handleClick={() => handleClick(item.objectID)}>Delete</Button>
                            </span>
                        </div>
                     ))}
            </div>
        );
    }
}

export default Table;