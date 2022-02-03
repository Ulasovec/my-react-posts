import './App.css';
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import Articles from "./components/Articles";
import PostAction from "./components/PostAction";
import {Contexst} from "./Contexst/Contexst";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./Pages/FirstPage/Home";
import PostIdPage from "./components/PostIdPage";
import {ModalBoot} from "./components/UI/ModalBoot";
import Admins from "./Pages/Admins";

// Create a client
const queryClient = new QueryClient();

function App() {
    const [admins, setAdmins] = useState({id:0, isAdmin:false, name:'name'});
    console.log(admins);



    return (
        <div className="App">

            <Contexst.Provider value={[admins, setAdmins]}>
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
            </Contexst.Provider>

        </div>
    );
}

export default App;
