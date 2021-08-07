import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostList from "./posts/PostList";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <PostList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
