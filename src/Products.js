import React from 'react';
import Filters from './Filters';
import ProductsTable from './ProductsTable';
import ProductForm from './ProductForm';

var PRODUCTS = {
  '1': {id: 1, category: 'Musical Instruments', price: '459.99', stocked: true, name: 'Clarinet'},
  '2': {id: 2, category: 'Musical Instruments', price: '5000', stocked: true, name: 'Harpsicord'},
  '3': {id: 3, category: 'Musical Instruments', price: '11000', stocked: false, name: 'Fortepiano'},
  '4': {id: 4, category: 'Furniture', price: '799', stocked: true, name: 'Chaise Lounge'},
  '5': {id: 5, category: 'Furniture', price: '1300', stocked: false, name: 'Dining Table'},
  '6': {id: 6, category: 'Furniture', price: '100', stocked: true, name: 'Bean Bag'}
};

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: PRODUCTS,
            search: "",
            stockChecked: false,
            sort: {name: "", order: 0},
            key: 0,
            productToUpdate: undefined
        }

        this.searchChange = this.searchChange.bind(this);
        this.stockChange = this.stockChange.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.addOrUpdateProduct = this.addOrUpdateProduct.bind(this);
        this.sort = this.sort.bind(this);
        this.populateForm = this.populateForm.bind(this);
    }

    filterProductsList(filter, stockChecked) {
        var liste = this.filterProductsListBySearchName(filter);
        liste = this.filterProductsListByStockStatus(stockChecked, liste);
        return liste;
    }

    filterProductsListBySearchName(filter) {
        var keys = Object.keys(PRODUCTS);
        var newFilteredProductsList = {};
        keys.forEach(function (key) {
            if(PRODUCTS[key].name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                newFilteredProductsList[key] = PRODUCTS[key];
            }
        });
        return newFilteredProductsList;
    }

    searchChange(event) {
        var filter = event.target.value;
        this.setState({
            search: filter,
            products: this.filterProductsList(filter, this.state.stockChecked)
        });
    }

    filterProductsListByStockStatus(stockChecked, liste) {
        if (!stockChecked) {
            return liste;
        }
        else {
            var keys = Object.keys(liste);
            var newFilteredProductsList = {};
            keys.forEach(function (key) {
                if(liste[key].stocked) {
                    newFilteredProductsList[key] = liste[key];
                }
            });
        }
            return newFilteredProductsList;
    }

    stockChange(event) {
        this.setState({
            stockChecked: event.target.checked,
            products: this.filterProductsList(this.state.search, event.target.checked)
        });
    }

    removeProduct(productID) {
        //find which product is to remove
        Object.keys(PRODUCTS).forEach(function(key) {
            if(PRODUCTS[key].id === productID) {
                delete PRODUCTS[key];
                return;
            }
        });
        this.refreshProductsList();
    }

    addOrUpdateProduct(product) {
        if (!product.id) {
            product.id = this.findAvailableKey();
            PRODUCTS[product.id] = product;
            this.sort({name: this.state.sort.name, order: this.state.sort.order});
        }
        else {
            PRODUCTS[this.state.key] = product;
            this.setState({
                key: 0,
                productToUpdate: undefined
            });
            this.sort({name: this.state.sort.name, order: this.state.sort.order});
        }
    }

    findKeyInPRODUCTS(product){
        var keys = Object.keys(PRODUCTS);
        var retour;
        keys.forEach(function (key) {
            if (PRODUCTS[key] === product) {
                retour = key;
            }
        });
        return retour;
    }

    populateForm(product) {
        var key = this.findKeyInPRODUCTS(product);
        this.setState({
            key: key,
            productToUpdate: product
        });
    }

    refreshProductsList() {
        this.setState({
            products: this.filterProductsList(this.state.search, this.state.stockChecked)
        });
    }

    findAvailableKey() {
        //return max_id + 1
        var maxKey = 0*1;
        Object.keys(PRODUCTS).forEach(function (key) {
            if (Number(key) > maxKey) {
                maxKey = Number(key);
            }
        });
        maxKey += 1;
        return maxKey;
    }

    sort(params){
        var newProducts = [];
        var clefs = Object.keys(PRODUCTS);
        clefs.map((clef) => newProducts.push(PRODUCTS[clef]));
        var index = 0;
        if (params.name === "price") {
            newProducts.sort(function (a, b) {
                return (a.price - b.price) * params.order;
            });
            index = 0;
            Object.keys(PRODUCTS).map((key) => PRODUCTS[key] = newProducts[index++]);
        }
        else if (params.name === "name") {
            newProducts.sort(function (a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1*params.order : (textA > textB) ? 1*params.order : 0;
                //return (a.name - b.name) * params.order;
            });
            index = 0;
            Object.keys(PRODUCTS).map((key) => PRODUCTS[key] = newProducts[index++]);
        }
        //update state
        this.setState({
            sort: {name: params.name, order: params.order}
        });
        this.refreshProductsList();
    }

    render() {
        return(
            <div>
                <h1>The shop</h1>
                <Filters search={this.state.search} cible={this.searchChange} stockChecked={this.state.stockChecked} cible2={this.stockChange} />
                <ProductsTable products={this.state.products} remove={this.removeProduct} sort={this.sort} status={this.state.sort} populate={this.populateForm} />
                <ProductForm addOrUpdate={this.addOrUpdateProduct} toUpdate={this.state.productToUpdate} />
            </div>
        );
    }
}

export default Products;