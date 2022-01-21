import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import About from "./Pages/About";
import Posts from './Pages/Posts';
import PostIdPage from "./components/PostIdPage";

function App() {

      return (

<Routes>
<Route path = "/" element={<Link to="/posts">Главная страница</Link>}/>
<Route exact path="/posts" element = {<Posts/>}/>
      <Route exact path="/posts/:id" element = {<PostIdPage/>}/>
</Routes>

      )

}

export default App;
