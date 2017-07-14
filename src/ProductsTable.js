import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

class ProductsTable extends React.Component {
    render() {
        var rows = [];
        var productsArray = [];
        var clefs = Object.keys(this.props.products);
        clefs.map((clef) => productsArray.push(this.props.products[clef]));
        productsArray.forEach((prod) => rows.push(<TableRow remove={this.props.remove} product={prod} key={prod.id} />));
        
        return(
            <table>
                <thead>
                    <tr>
                        <TableHeader column="name" sort={this.props.sort} sorting={this.props.status}/>
                        <TableHeader column="price" sort={this.props.sort} sorting={this.props.status}/>
                    </tr>
                </thead>
                <tbody>
                   {rows}
                </tbody>
            </table>
        );
    }
}

export default ProductsTable;