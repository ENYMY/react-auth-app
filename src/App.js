import "./App.css";
import Layout from "./components/Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";
import { useContext } from "react";
import AuthContext from "./store/AuthContext";

function App() {
  const context = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={HomePage} />
        {!context.isLoggedIn && (
          <Route path='/auth' exact component={AuthPage} />
        )}

        {context.isLoggedIn && (
          <Route path='/profile' exact component={UserProfile} />
        )}
        <Route path='*'>
          <Redirect path='/'></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
