import './App.css';
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import Articles from "./components/Articles";
import PostAction from "./components/PostAction";
import {Contexst} from "./Contexst/Contexst";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./Pages/FirstPage/Home";
import PostIdPage from "./components/PostIdPage";

// Create a client
const queryClient = new QueryClient();
function App() {
    const [select,setSelect] = useState(0);
    const [id,setId]=useState(0)


    return (
        <div className="App">

<Contexst.Provider value={[select,setSelect,id,setId]}>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/Articles' element={<Articles/>}/>
                    <Route exact path='/Posts' element={<PostAction/>}/>
                    <Route exact path="/posts/:id" element = {<PostIdPage/>}/>
                </Routes>
            </QueryClientProvider>
</Contexst.Provider>

        </div>
    );
}

export default App;
