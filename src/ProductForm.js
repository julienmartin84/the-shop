import React from 'react';

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.addProduct = this.addProduct.bind(this);
    }

    addProduct() {
        var product = {};
        var form = document.getElementById("addProductForm");
        //{id: 1, category: 'Musical Instruments', price: '$459.99', stocked: true, name: 'Clarinet'}
        product.category = form.elements.category.value;
        product.price = form.elements.price.value;
        product.stocked = form.elements.inStock.checked;
        product.name = form.elements.name.value;

        form.elements.category.value = "";
        form.elements.price.value = "";
        form.elements.inStock.checked = false;
        form.elements.name.value = "";

        this.props.add(product);
    }
    render() {
        return(
            <form id="addProductForm">
                <h3>Enter a new product</h3>
                <p>
                    <label>
                        Name <br />
                        <input type="text" name="name" />
                    </label>
                </p>
                <p>
                    <label>
                        Category <br />
                        <input type="text" name="category" />
                    </label>
                </p>
                <p>
                    <label>
                        Price <br />
                        <input type="text" name="price" />
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" name="inStock" /> In stock?
                    </label>
                </p>
                <button type="button" onClick={this.addProduct}>Save</button>
            </form>
        );
    }
}

export default ProductForm;