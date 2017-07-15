import React from 'react';
import './TableRow.css';

class TableRow extends React.Component {
    render() {
        return(
            <tr>
                <td className={this.props.product.stocked ? '' : 'notInStock'}>
                    {this.props.product.name}
                </td>
                <td>
                    {this.props.product.price}
                </td>
                <td>
                    <button onClick={() => this.props.remove(this.props.product.id)}>x</button>
                </td>
                <td>
                    <button onClick={() => this.props.populate(this.props.product)}>edit</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;