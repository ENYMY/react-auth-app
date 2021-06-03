import "./App.css";
import Layout from "./components/Layout/Layout";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route to='/' exact component={HomePage} />
        <Route to='/auth' exact component={AuthPage} />
        <Route to='profile' exact component={ProfilePage} />
      </Switch>
    </Layout>
  );
}

export default App;
