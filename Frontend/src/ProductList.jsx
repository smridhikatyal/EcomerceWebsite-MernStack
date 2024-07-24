// // import React, { useState, useEffect } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { addToCart } from './slices/cartSlice';
// // import axios from 'axios';

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const productsPerPage = 10;
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     axios.get('https://fakestoreapi.com/products').then((response) => {
// //       const sortedProducts = response.data.sort((a, b) =>
// //         a.title.localeCompare(b.title)
// //       );
// //       setProducts(sortedProducts);
// //     });
// //   }, []);

// //   const nextPage = () => {
// //     setCurrentPage((prevPage) => prevPage + 1);
// //   };

// //   const previousPage = () => {
// //     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
// //   };

// //   const currentProducts = products.slice(
// //     (currentPage - 1) * productsPerPage,
// //     currentPage * productsPerPage
// //   );

// //   const handleAddToCart = (product) => {
// //     dispatch(addToCart(product));
// //   };

// //   return (
// //     <div>
// //       <h2>Product List</h2>
// //       <ul>
// //         {currentProducts.map((product) => (
// //           <li key={product.id}>
// //             <img src={product.image} alt={product.title} width="50" height="50" />
// //             <p>{product.title}</p>
// //             <p>${product.price}</p>
// //             <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
// //           </li>
// //         ))}
// //       </ul>
// //       <button onClick={previousPage} disabled={currentPage === 1}>
// //         Previous
// //       </button>
// //       <button
// //         onClick={nextPage}
// //         disabled={currentProducts.length < productsPerPage}
// //       >
// //         Next
// //       </button>
// //     </div>
// //   );
// // };

// // export default ProductList;
// // import React, { useState, useEffect } from 'react';
// // import { useSelector,useDispatch } from 'react-redux';
// // import { addToCart } from './slices/cartSlice';
// // import axios from 'axios';

// // import { useTranslation } from "react-i18next";

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const productsPerPage = 10;
// //   const dispatch = useDispatch();
// //   const { t } = useTranslation();

// //   useEffect(() => {
// //     axios.get('https://fakestoreapi.com/products').then((response) => {
// //       const sortedProducts = response.data.sort((a, b) =>
// //         a.title.localeCompare(b.title)
// //       );
// //       setProducts(sortedProducts);
// //     });
// //   }, []);

// //   const nextPage = () => {
// //     setCurrentPage((prevPage) => prevPage + 1);
// //   };

// //   const previousPage = () => {
// //     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
// //   };

// //   const currentProducts = products.slice(
// //     (currentPage - 1) * productsPerPage,
// //     currentPage * productsPerPage
// //   );

// //   const handleAddToCart = (product) => {
// //     dispatch(addToCart(product));
// //   };

// //   return (
// //     <div>
// //       <h2>{t("title")}</h2>
// //         <ul>
// //           {currentProducts.map((product) => (
// //             <li key={product.id}>
// //               <img src={product.image} alt={product.title} width="50" height="50" />
// //               <p>{product.title}</p>
// //               <p>${product.price}</p>
// //               <button onClick={() => handleAddToCart(product)}>
// //                 {t("add_to_cart")}
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //         <button onClick={previousPage} disabled={currentPage === 1}>
// //           Previous
// //         </button>
// //         <button onClick={nextPage} disabled={currentProducts.length < productsPerPage}>
// //           Next
// //         </button>
// //       </div>
// //   );
// // };

// // export default ProductList;

// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import axiosInstance from "./axiosConfig.js"; // Assuming you have configured Axios for authenticated requests
// import { addToCart } from "./slices/cartSlice";

// const generateRandomProducts = (count) => {
//   const categories = ['Electronics', 'Clothing', 'Books', 'Toys', 'Home Decor'];
//   const descriptions = [
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//     'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   ];
//   const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//     const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
//   const products = [];
//   for (let i = 1; i <= count; i++) {
//     products.push({
//       id: i,
//       title: `Product ${i}`,
//       description: `Description for Product ${i}`,
//       //category: randomCategory,
//       price: (Math.random() * 100).toFixed(2),
//       image: `https://via.placeholder.com/150?text=Product+${i}`,
//     });
//   }
//   return products;
// };
// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const productsPerPage = 5;
//   const dispatch = useDispatch();
//   const { t, i18n } = useTranslation();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Assuming Redux state for authentication
//   const role = useSelector((state) => state.auth.role);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//     //     const response = await axiosInstance.get(
//     //       "https://fakestoreapi.com/products",
//     //     ); // Authenticated request using axiosInstance
//     //     const sortedProducts = response.data.sort((a, b) =>
//     //       a.title.localeCompare(b.title),
//     //     );
//     //     const translatedProducts = sortedProducts.map((product) => ({
//     //       ...product,
//     //       title: t(product.title),
//     //       description: t(product.description),
//     //     }));
//     //     setProducts(translatedProducts);
//     //   } catch (error) {
//     //     console.error("Error fetching products:", error);
//     //   }
//     // };

//     const generatedProducts = generateRandomProducts(10);

//     const handlePostProducts = async () => {

//       try {
//         const response = await axiosInstance.post('/api/products', { products });
//         console.log('Products posted:', response.data);
//         // Handle success if needed
//       } catch (error) {
//         console.error('Error posting products:', error);
//         // Handle error
//       }
//     };
//     const response = await axiosInstance.get("/products", {
//       params: {
//         page: currentPage,
//         limit: productsPerPage,
//       },
//     });
//     // const sortedProducts = response.data.generatedProducts.sort((a, b) =>
//     //   a.title.localeCompare(b.title),
//     // );
//     const translatedProducts = generatedProducts.map((product) => ({
//       ...product,
//       title: t(product.title),
//       description: t(product.description),
//     }));
//     setProducts(translatedProducts);
//     setTotalPages(response.data.pages);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };

//     // if (isAuthenticated) {
//       fetchProducts();
//     //}
//   }, [isAuthenticated, t, i18n.language]);

//   const nextPage = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const previousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const currentProducts = products.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage,
//   );

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//   };

//   const handleMarkOutOfStock = async (productId) => {
//     try {
//       const response = await axiosInstance.put(`/products/${productId}/outofstock`);
//       console.log('Product marked out of stock:', response.data);
//       // Optionally show notification or update UI
//     } catch (error) {
//       console.error('Error marking product out of stock:', error);
//     }
//   };
//   return (
// //     <div>
// //       {/* {!isAuthenticated && (
// //         <p>You are not authenticated. Please log in to view products.</p>
// //       )} */}
// //       <h2>{t("title")}</h2>
// //       <ul>
// //         {currentProducts.map((product) => (
// //           <li key={product.id}>
// //             <img
// //               src={product.image}
// //               alt={product.title}
// //               width="50"
// //               height="50"
// //             />
// //             <p>{product.title}</p>
// //             <p>${product.price}</p>
// //             <button onClick={() => handleAddToCart(product)}>
// //               {t("add_to_cart")}
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //       <button onClick={previousPage} disabled={currentPage === 1}>
// //         {t("previous")}
// //       </button>
// //       <button
// //         onClick={nextPage}
// //         disabled={currentProducts.length < productsPerPage}
// //       >
// //         {t("next")}
// //       </button>
// //     </div>
// //   );
// // };
// <div className="product-list">
//       <h2>{t('product_list')}</h2>
//       <div className="products">
//         {currentProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             <img src={product.image} alt={product.title} />
//             <div className="product-details">
//               <h3>{product.title}</h3>
//               <p className="product-description">{product.description}</p>
//               <p className="product-price">${product.price}</p>
//               {role === 'admin' ? (
//               <button onClick={() => handleMarkOutOfStock(product._id)}>
//                 Mark Out of Stock
//               </button>
//             ) : (
//               <button onClick={() => handleAddToCart(product)}>{t('add_to_cart')}</button>
//             )}

//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         <button onClick={previousPage} disabled={currentPage === 1}>{t('previous')}</button>
//         <button onClick={nextPage} disabled={currentProducts.length < productsPerPage}>{t('next')}</button>
//       </div>
//     </div>
//   );
// };

// export default ProductList;
// // <ul>
// //   {currentProducts.map((product) => (
// //     <li key={product.id}>
// //       <img
// //         src={product.image}
// //         alt={product.title}
// //         width="50"
// //         height="50"
// //       />
// //       <p>{product.title}</p>
// //       <p>${product.price}</p>
// //       <button onClick={() => handleAddToCart(product)}>
// //         {t('add_to_cart')}
// //       </button>
// //     </li>
// //   ))}
// // </ul>
// // <button onClick={previousPage} disabled={currentPage === 1}>
// //   Previous
// // </button>
// // <button
// //   onClick={nextPage}
// //   disabled={currentProducts.length < productsPerPage}
// // >
// //   Next
// // </button>
// // {
// //   "title": "Lista de Productos",
// //   "add_to_cart": "Agregar al Carrito",
// //   "cart": "Carrito",
// //   "quantity": "Cantidad",
// //   "remove": "Eliminar",
// //   "order": "Ordenar",
// //   "view_orders": "Ver Órdenes",
// //   "order_list": "Lista de Órdenes",
// //   "order_id": "ID de Orden",
// //   "description": "Descripción",
// //   "edit": "Editar",
// //   "no_orders": "No hay órdenes disponibles",
// //   "not_authenticated": "No estás autenticado. Por favor inicia sesión para ver los productos.",

// // }
// // Add a request interceptor

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