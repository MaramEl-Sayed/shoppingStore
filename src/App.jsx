import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ProductsByCategory from "./pages/ProductsByCategory";
import Layout from "./pages/Layout";
import ProductDetails from "./pages/ProductDetails";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Cart from "./pages/Cart";


function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/products-category/:categoryId"
              element={<ProductsByCategory />}       
            />
            <Route path="cart" element={<Cart />} />

            <Route path="/product/:productId" element={<ProductDetails/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
