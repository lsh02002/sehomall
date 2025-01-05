import "./app.css";
import styled from "styled-components";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import { useContext, useEffect } from "react";
import { LoginContext } from "./api/loginContextApi";
import EnrollItemPage from "./pages/EnrollItemPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import MyPage from "./pages/MyPage";
import NoticePage from "./pages/NoticePage";
import ContactPage from "./pages/ContactPage";
import InstagramPage from "./pages/InstagramPage";

function App() {
  const { setIsLogin } = useContext(LoginContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  return (
    <Container>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cat/:cat" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/enroll" element={<EnrollItemPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/instagram" element={<InstagramPage />} />
        </Routes>
        <Footer />
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100vw;  
`;
