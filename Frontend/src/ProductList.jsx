

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./axiosConfig";
import { addToCart } from "./slices/cartSlice";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        // Fetch 10 products from Fake Store API
        const response = await axiosInstance.get(
          "https://fakestoreapi.com/products?limit=10",
        );
        const fetchedProducts = response.data;

        // Post fetched products to  backend /products endpoint
        await axiosInstance.post("/api/products", fetchedProducts);

        // Set products state to display in UI
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        //console.error("Error fetching or posting products:", error);
      }
    };

    fetchProducts();

  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axiosInstance.get(`/search?query=${searchQuery}`);
  //     console.log(response)
  //     setProducts(response.data);
  //   } catch (error) {
  //     console.error('Error searching products:', error);
  //   }
  // };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleMarkOutOfStock = async (productId) => {

    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(
        `/api/products/${productId}/outofstock`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const updatedProduct = response.data;

      // Update products state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product,
        ),
      );

      alert("Product marked as out of stock successfully!");
    } catch (error) {
     // console.error("Error marking product as out of stock:", error);
      alert("Failed to mark product as out of stock. Please try again.");
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>

        {products.map((product) => (
          <li key={product._id}>
            <img
              src={product.image}
              alt={product.title}
              width="50"
              height="50"
            />
            <p>{product.title}</p>
            <p>${product.price}</p>
            {role === "user" && (
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            )}
            {role === "admin" && (
              <button onClick={() => handleMarkOutOfStock(product._id)}>
                Mark Out of Stock
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

/* <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button></form> */
