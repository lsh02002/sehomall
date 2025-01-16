import "./app.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { lazy, Suspense, useContext, useEffect } from "react";
import { LoginContext } from "./api/loginContextApi";
import PageLoading from "./components/PageLoading";

const Loading = <PageLoading />;
const About = lazy(() => import("./pages/AboutPage"));
const Main = lazy(() => import("./pages/MainPage"));
const Category = lazy(() => import("./pages/CategoryPage"));
const Login = lazy(() => import("./pages/LoginPage"));
const Enroll = lazy(() => import("./pages/EnrollItemPage"));
const Detail = lazy(() => import("./pages/DetailPage"));
const Cart = lazy(() => import("./pages/CartPage"));
const MyPage = lazy(() => import("./pages/MyPage"));
const Notice = lazy(() => import("./pages/NoticePage"));
const Contact = lazy(() => import("./pages/ContactPage"));
const Instagram = lazy(() => import("./pages/InstagramPage"));
const Search = lazy(() => import("./pages/SearchPage"));

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
          <Route
            path="/"
            element={
              <Suspense fallback={Loading}>
                <Main />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={Loading}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/cat/:cat"
            element={
              <Suspense fallback={Loading}>
                <Category />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={Loading}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/enroll"
            element={
              <Suspense fallback={Loading}>
                <Enroll />
              </Suspense>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Suspense fallback={Loading}>
                <Detail />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={Loading}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/mypage"
            element={
              <Suspense fallback={Loading}>
                <MyPage />
              </Suspense>
            }
          />
          <Route
            path="/notice"
            element={
              <Suspense fallback={Loading}>
                <Notice />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={Loading}>
                <Contact />
              </Suspense>
            }
          />          
          <Route
            path="/instagram"
            element={
              <Suspense fallback={Loading}>
                <Instagram />
              </Suspense>
            }
          />
          <Route
            path="/search"
            fallback={Loading}
            element={
              <Suspense fallback={Loading}>
                <Search />
              </Suspense>
            }
          />
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
  position: relative;
`;
