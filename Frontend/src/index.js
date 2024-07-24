// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'

// ReactDOM.createRoot(document.getElementById('root')).render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>
// );
// import React from "react";
// import ReactDOM from "react-dom/client";
// import Profile from "./Profile";
// // import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
// import { Provider } from "react-redux";
// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import App from "./App";
// import Cart from "./Cart";
// import "./i18n";
// import Login from "./Login";
// import OrderList from "./Orderlist";

// import store from "./store";

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught by error boundary:", error, errorInfo);
//     // You could also log the error to an error reporting service here
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong. Please try again later.</h1>;
//     }

//     return this.props.children;
//   }
// }

// const Root = () => {
//   // const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Example selector for Redux
//   return (
//     <Provider store={store}>
//       <Router>
//         <ErrorBoundary>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/" element={<App />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/order-list" element={<OrderList />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </ErrorBoundary>
//       </Router>
//     </Provider>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
// );
//<ProtectedRoute path="/cart" element={<Cart />}/>
// <Provider store={store}>
// 	<Router>
// 	<Routes>
// 	<Route path ="/login" element={<Login />} />

// 		<ProtectedRoute
// 			path ="/"
// 			element={<App />}
// 			isAuthenticated={isAuthenticated}
// 			/>

// 		<ProtectedRoute
// 			path ="/order-list"
// 			element= {<OrderList />}
// 			isAuthenticated={isAuthenticated}/>

// 	</Routes>
// 	</Router>
// 	</Provider>









// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'

// ReactDOM.createRoot(document.getElementById('root')).render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import Profile from "./Profile.jsx";
// import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom'
import { Provider } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App.jsx";
import Cart from "./Cart.jsx";
import "./i18n.js";
import Login from "./Login.jsx";
import Orderlist from "./Orderlist.jsx";
import ProductList from "./ProductList.jsx";
import Register from "./Register.jsx";
import store from "./store.js";
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error("Error caught by error boundary:", error, errorInfo);
		// You could also log the error to an error reporting service here
	}

	render() {
		if (this.state.hasError) {
			return <h1>Something went wrong. Please try again later.</h1>;
		}

		return this.props.children;
	}
}

const Root = () => {
	// const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Example selector for Redux
	return (
		<Provider store={store}>
			<Router>
				<ErrorBoundary>
					<Routes>
					<Route path="/" element={<Navigate to="/register" />} />
					<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/home" element={<App />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/order-list" element={<Orderlist/>} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/admin/products" element={<ProductList />} />

					</Routes>
				</ErrorBoundary>
			</Router>
		</Provider>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
);
//<ProtectedRoute path="/cart" element={<Cart />}/>
// <Provider store={store}>
// 	<Router>
// 	<Routes>
// 	<Route path ="/login" element={<Login />} />

// 		<ProtectedRoute
// 			path ="/"
// 			element={<App />}
// 			isAuthenticated={isAuthenticated}
// 			/>

// 		<ProtectedRoute
// 			path ="/order-list"
// 			element= {<OrderList />}
// 			isAuthenticated={isAuthenticated}/>

// 	</Routes>
// 	</Router>
// 	</Provider>

