import React, { useState, useEffect } from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import PropertyDetail from "../Property/PropertyDetail";
import Signin from "../signin/Signin";
import Signup from "../signin/Signup";
import Contactt from "../common/footer/Contactt";
import Dashboard from "../Dashboard/Dashboard";
import AllAdds from "../Dashboard/AllAdds";
import CreateAdd from "../Dashboard/CreateAdd";
import EditAdd from "../Dashboard/EditAdd";
import Privacy from "../legal/Privacy";
import Terms from "../legal/Terms";
import Prediction from "./Prediction";

const Pages = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Check if user data exists in local storage
    const checklogin = localStorage.getItem("login");
    // console.log(checklogin);
    const login = checklogin === "false" ? false : true;

    // console.log("Islogin pages: ", login);

    setIsLogin(login);
  }, []);
  return (
    <>
      <Router>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alladds" element={<AllAdds />} />
          <Route path="/createadd" element={<CreateAdd />} />
          <Route path="/editadd/:id" element={<EditAdd />} />
          {!isLogin && (
            <>
              <Route
                path="/login"
                element={<Signin isLogin={isLogin} setIsLogin={setIsLogin} />}
              />
              <Route
                path="/signup"
                element={<Signup isLogin={isLogin} setIsLogin={setIsLogin} />}
              />
            </>
          )}
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/services" element={<Services />} />
          <Route path="/properties" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/prediction" element={<Prediction />} />
        </Routes>
        <Contactt />

        <Footer />
      </Router>
    </>
  );
};

export default Pages;
