import React from 'react';

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.addOrUpdateProduct = this.addOrUpdateProduct.bind(this);
    }

    addOrUpdateProduct() {
        var form = document.getElementById("addProductForm");
        if (form.elements.name.value === "") {
            form.elements.name.placeholder = "Please enter a name";
        }
        else {
            var product = {};
            if (this.props.toUpdate) {
                product.id = this.props.toUpdate.id;
            }
            product.category = form.elements.category.value;
            product.price = form.elements.price.value;
            product.stocked = form.elements.inStock.checked;
            product.name = form.elements.name.value;

            form.elements.category.value = "";
            form.elements.price.value = "";
            form.elements.inStock.checked = false;
            form.elements.name.value = "";

            this.props.addOrUpdate(product);
        }
    }

    render() {
        if (this.props.toUpdate) {
            var form = document.getElementById("addProductForm");
            form.elements.name.value = this.props.toUpdate.name;
            form.elements.category.value = this.props.toUpdate.category;
            form.elements.price.value = this.props.toUpdate.price;
            form.elements.inStock.checked = this.props.toUpdate.stocked;
        }

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
                <button type="button" onClick={this.addOrUpdateProduct}>Save</button>
            </form>
        );
    }
}

export default ProductForm;