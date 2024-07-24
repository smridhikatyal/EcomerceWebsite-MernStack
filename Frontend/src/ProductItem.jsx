import React from 'react';

const ProductItem = ({ product, addToCart }) => {
    return (
        <li>
            <img src={product.image} alt={product.title} width="50" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </li>
    );
};

export default ProductItem;
// Rendering:
// The component displays the product image, title, and price.
// It also includes an "Add to Cart" button that calls the addToCart function passed as a prop when clicked.



