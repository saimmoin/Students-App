import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { SignIn } from "./components/SignIn/SignIn";
import { Students } from "./components/Students/Students";
import { StudentDetails } from "./components/StudentDetails/StudentDetails";
import { About } from "./components/About/About";
import { NotAuthorized } from "./components/NotAuthorized/NotAuthorized";
import { Error404 } from "./components/Error404/Error404";
import { makeStyles, AppBar, Toolbar, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import SignUp from "./components/SignUp/SignUp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  // const a = 1, b= 5, c =10;
  // const d = 2;
  // const e = 4;
  // const f = 4;

  const onSignInSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const inputs = Object.keys(e.target)
        .filter(
          (key) =>
            e.target[key].tagName === "INPUT" &&
            (e.target[key].type === "text" || e.target[key].type === "password")
        )
        .map((key) => e.target[key]),
      savedData = JSON.parse(localStorage.getItem("userData"));

    for (const input of inputs) {
      if (!loginData[input.name]) {
        setLogged(false);
        alert(`Please enter your ${[input.name]}`);
        document.getElementById([input.name]).focus();
        return false;
      }
    }
    if (savedData) {
      let logIn = false;
      for (let i = 0; i < savedData.length; i++) {
        if (
          loginData.email === savedData[i].email &&
          loginData.password === savedData[i].password
        ) {
          logIn = true;
          setLogged(true);

          localStorage.setItem("loggedAccount", JSON.stringify(savedData[i]));
          setName(savedData[i].firstName);
          alert("You are logged in");
          break;
        }
      }
      if (!logIn) {
        alert("Incorrect email or password");
        setLogged(false);
        document.getElementById("email").focus();
        return false;
      }
    } else {
      alert("Incorrect email or password");
      setLogged(false);
      document.getElementById("email").focus();
      return false;
    }
  };
//useState is a Hook that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value. ... Declaring state in React.
  const [studentProfileData, setStudentProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onStudentProfileChange = (e) => {
    //console.log("profile data is changed", e.target);
    const { name, value } = e.target;
    // console.log("before", studentProfileData);
    setStudentProfileData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  // console.log("after", studentProfileData);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onSignupSubmit = (e) => {
    e.preventDefault();

    const inputs = Object.keys(e.target)
        .filter(
          (key) =>
            e.target[key].tagName === "INPUT" &&
            (e.target[key].type === "text" || e.target[key].type === "password")
        )
        .map((key) => e.target[key]),
      savedData = JSON.parse(localStorage.getItem("userData"));
    for (const input of inputs) {
      setLogged(true);
      if (!studentProfileData[input.name]) {
        setLogged(false);
        alert(`Please enter all required fields`);
        document.getElementById([input.name]).focus();
        break;
      }
    }
    if (savedData) {
      for (let i = 0; i < savedData.length; i++) {
        if (studentProfileData.email === savedData[i].email) {
          alert("Already registered on this email");
          document.getElementById("email").focus();
          setLogged(false);
          break;
        }
      }
    }
  };

  const onSignInChange = (e) => {
    const { name, value } = e.target;
    setLoginData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const classes = useStyles(),
    [logged, setLogged] = useState(localStorage.getItem("logged")),
    [name, setName] = useState(
      (JSON.parse(localStorage.getItem("loggedAccount")) &&
        JSON.parse(localStorage.getItem("loggedAccount")).firstName) ||
        ""
    );

  useEffect(() => {
    if (logged && studentProfileData.firstName) {
      alert("You have created an account!");
      const accounts = JSON.parse(localStorage.getItem("userData")) || [];
      accounts.push(studentProfileData);
      localStorage.setItem("logged", "true");
      localStorage.setItem("userData", JSON.stringify(accounts));
      localStorage.setItem("loggedAccount", JSON.stringify(studentProfileData));
      setName(studentProfileData.firstName);
      // clear the form
      setStudentProfileData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } else if (logged && loginData.email) {
      localStorage.setItem("logged", "true");
      setLoginData({
        email: "",
        password: "",
      });
    }
  }, [logged]);

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit">
              <Link className="btns" to="/">
                HOME
              </Link>
            </Button>
            <Button color="inherit">
              <Link className="btns" to="/about">
                ABOUT
              </Link>
            </Button>
            <Button color="inherit">
              <Link className="btns" to="/students">
                Students
              </Link>
            </Button>
            {!logged ? (
              <>
                <Button color="inherit">
                  <Link className="btns" to="/signup">
                    Sign Up
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link className="btns" to="/signin">
                    Sign In
                  </Link>
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => {
                  setLogged(false);
                  setName("");
                  localStorage.removeItem("logged");
                  localStorage.removeItem("loggedAccount");
                }}
              >
                Log out
              </Button>
            )}
            {logged ? (
              <Button id="name" disabled>
                {name}'s account
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/about" component={About}></PrivateRoute>
          <Route path="/not-authorized">
            <NotAuthorized />
          </Route>

          <Route path="/signin">
            <SignIn
              onChange={onSignInChange}
              loginData={loginData}
              onSignInSubmit={onSignInSubmit}
            />
          </Route>
          <Route path="/signup">
            <SignUp
              onSignupSubmit={onSignupSubmit}
              onChange={onStudentProfileChange}
              studentProfileData={studentProfileData}
            />
          </Route>

          <PrivateRoute path="/students" component={Students}></PrivateRoute>

          <PrivateRoute
            path="/students-details"
            component={StudentDetails}
          ></PrivateRoute>
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
