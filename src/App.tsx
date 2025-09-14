import "./app.css";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import { lazy, Suspense, useEffect } from "react";
import { useLogin } from "./api/loginContextApi";
import PageLoading from "./components/layout/PageLoading";

const Loading = <PageLoading />;
const About = lazy(() => import("./pages/AboutPage"));
const Main = lazy(() => import("./pages/MainPage"));
const Category = lazy(() => import("./pages/CategoryPage"));
const Login = lazy(() => import("./pages/LoginPage"));
const SignUp = lazy(() => import("./pages/SignupPage"));
const Enroll = lazy(() => import("./pages/EnrollItemPage"));
const Detail = lazy(() => import("./pages/DetailPage"));
const Cart = lazy(() => import("./pages/CartPage"));
const MyPage = lazy(() => import("./pages/MyPage"));
const Notice = lazy(() => import("./pages/NoticePage"));
const Contact = lazy(() => import("./pages/ContactPage"));
const Instagram = lazy(() => import("./pages/InstagramPage"));
const Search = lazy(() => import("./pages/SearchPage"));
const Review = lazy(() => import("./pages/ReviewPage"));
const Payment = lazy(() => import("./pages/PaymentPage"));

function App() {
  const { setIsLogin } = useLogin();

  useEffect(() => {          
    setIsLogin(true);    
  }, [setIsLogin]);

  return (
    <Container>
      <Router>        
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
            path="/category"
            element={
              <Suspense fallback={Loading}>
                <Category />
              </Suspense>
            }
          />
          <Route
            path="/cate/:cat"
            element={
              <Suspense fallback={Loading}>
                <div>카테고리 중비중!</div>
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
            path="/signup"
            element={
              <Suspense fallback={Loading}>
                <SignUp />
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
            path="/mypage/:cate"
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
            element={
              <Suspense fallback={Loading}>
                <Search />
              </Suspense>
            }
          />
          <Route
            path="/reviews"            
            element={
              <Suspense fallback={Loading}>
                <Review />
              </Suspense>
            }
          />
          <Route
            path="/pay"            
            element={
              <Suspense fallback={Loading}>
                <Payment />
              </Suspense>
            }
          />
        </Routes>
        <Nav />
        {/* <Footer /> */}
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
  width: 96vw;
  position: relative;
`;
