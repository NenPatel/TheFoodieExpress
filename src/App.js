import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
// import Menu from "./components/Menu";
import About from "./components/About";
import Service from "./components/Service";
import Contact from "./components/Contact";
import Checkout from "./components/Checkout";
import Receipe from "./components/Receipe";
// import Login from "./components/Login";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col ">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            {/* <Route path="/menu" element={<Menu />} /> */}
            <Route path="/aboutus" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/receipe" element={<Receipe />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
