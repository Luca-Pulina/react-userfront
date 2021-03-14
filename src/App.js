import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Userfront from "@userfront/react";

Userfront.init("xbr759nw");

const SignupForm = Userfront.build({
  toolId: process.env.REACT_APP_SIGNUP_ID
});

const LoginForm = Userfront.build({
  toolId: process.env.REACT_APP_LOGIN_ID
});
const PasswordResetForm = Userfront.build({
  toolId: process.env.REACT_APP_RESET_ID
});

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/reset">Reset</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/reset">
            <PasswordReset />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <h2>Home</h2>
      <SignupForm />
    </>
  )

}

function Login() {
  return (
    <>
      <h2>Login</h2>
      <LoginForm />
    </>
  )
}

function PasswordReset() {
  return (
    <>
      <h2>Password Reset</h2>
      <PasswordResetForm />
    </>
  )
}

function Dashboard() {
  function renderFn({ location }) {
    // If the user is not logged in, redirect to login
    if (!Userfront.accessToken()) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      );
    }
        // If the user is logged in, show the dashboard
        const userData = JSON.stringify(Userfront.store, null, 2);
        console.log(Userfront)
        return (
          <div>
            <h2>Dashboard</h2>
            <pre>{userData}</pre>
            <button onClick={Userfront.logout}>Logout</button>
          </div>
        );
      }
    
      return <Route render={renderFn} />;
    }