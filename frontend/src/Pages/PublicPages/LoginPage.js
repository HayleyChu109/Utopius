// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

import NavBar from "../../Components/PublicComponents/NavBar";
import LoginForm from "../../Components/PublicComponents/LoginForm";
import SignupForm from "../../Components/PublicComponents/SignupForm";
import Footer from "../../Components/PublicComponents/Footer";

import "../SCSS/loginPage.scss";

const LoginPage = () => {
  // const { isAuthenticated } = useSelector((state) => state.loginStore);

  // const history = useHistory();

  // useEffect(() => {
  //   console.log(isAuthenticated);
  //   if (isAuthenticated === true) {
  //     history.push("/");
  //   } else {
  //     console.log("Not authenticated");
  //   }
  // }, [isAuthenticated, history]);

  return (
    <>
      <NavBar />
      <div className="d-flex align-items-center justify-content-center login-page">
        <div className="container login-card row p-5">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <LoginForm />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <SignupForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
