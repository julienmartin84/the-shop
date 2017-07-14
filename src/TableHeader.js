import React from 'react';
import './TableHeader.css';

class TableHeader extends React.Component {
    render() {
        return(
            <th>
                {this.props.column} &nbsp;
                <button className={(this.props.sorting.name===this.props.column && this.props.sorting.order===1) ? 'sorting' : ''} onClick={() => this.props.sort({name:this.props.column, order: 1})}>&#x25B2;</button>
                <button className={(this.props.sorting.name===this.props.column && this.props.sorting.order===-1) ? 'sorting' : ''} onClick={() => this.props.sort({name:this.props.column, order: -1})}>&#x25BC;</button>
            </th>
        );
    }
}

export default TableHeader;