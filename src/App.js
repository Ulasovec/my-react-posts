import './App.css';

import {QueryClient, QueryClientProvider} from "react-query";
import Articles from "./components/Articles";
import PostAction from "./components/PostAction";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./Pages/FirstPage/Home";
import PostIdPage from "./components/PostIdPage";
import {ModalBoot} from "./components/UI/ModalBoot";
import Admins from "./Pages/Admins";

// Create a client
const queryClient = new QueryClient();

function App() {

    return (
        <div className="App">


            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route exact path='/Admins' element={<ModalBoot/>}/>
                    <Route exact path='/Admins/:id' element={<Admins/>}/>
                    <Route path='/Articles' element={<Articles/>}/>
                    <Route exact path='/Posts' element={<PostAction/>}/>
                    <Route exact path="/posts/:id" element={<PostIdPage/>}/>
                </Routes>
            </QueryClientProvider>

        </div>
    );
}

export default App;
