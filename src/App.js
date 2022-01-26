import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import {Route, Routes, Outlet, Link} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import TestPage from "./pages/TestPage";

// Create a client
const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<IndexPage/>} />
                    <Route path="about" element={<About/>} />
                    <Route path="contacts" element={<Contacts/>} />
                    <Route path="testpage" element={<TestPage/>} />
                </Route>
            </Routes>
        </QueryClientProvider>
    );
}

// Layout, Header, Footer
function Layout() {
    return (
        // Основной Layout. Содержит основные элементы страницы, которые
        // загружаются на все роуты
        <div className="App">
            <Header/>
            <main className="content">
                {/* Outlet показывает, куда нужно вставлять дочерние страницы */}
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

function Header() {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="about">About</Link>
                <Link to="contacts">Contacts</Link>
                <Link to="testpage">Test Page</Link>
            </nav>
        </header>
    )
}

function Footer() {
    return (
        <footer>Footer</footer>
    )
}

export default App;
