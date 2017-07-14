import React from 'react';

class Filters extends React.Component {
    componentDidMount() {
        document.getElementById("searchArea").focus();
    }

    render() {
        return(
            <div>
                <input type="text" id="searchArea" placeholder="search..." value={this.props.search} onChange={this.props.cible} />
                <p><label><input type="checkbox" checked={this.props.stockChecked} onChange={this.props.cible2} />Only show products in stock</label></p>
            </div>
        );
    }
}

export default Filters;