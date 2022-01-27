import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import {Route, Routes, Outlet, Link} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import TestPage from "./pages/TestPage";
import Whoops404 from "./pages/Whoops404";
import {
    About,
    Contacts,
    ArticlesPage,
    DemosIndexPage,
    SearchSortPage,
    ArticlePage,
    FetchPage,
    InfinityPage
} from "./pages/pages";

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
                    <Route path="demos" element={<DemosLayout/>}>
                        <Route index element={<DemosIndexPage/>} />
                        <Route path="articles" element={<ArticlesPage/>} />
                        <Route path="articles/:articleId" element={<ArticlePage/>} />
                        <Route path="search-sort" element={<SearchSortPage/>}/>
                        <Route path="fetch" element={<FetchPage/>} />
                        <Route path="infinity" element={<InfinityPage/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<Whoops404/>} />
            </Routes>
        </QueryClientProvider>
    );
}

/**
 * Layouts, Header, Footer
 */

// Основной Layout. Содержит основные элементы страницы, которые загружаются на все роуты
function Layout() {
    return (

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
                <Link to="demos">Demos</Link>
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

// Layout для демо-страниц - path="/demos"
function DemosLayout() {
    return (
        <div>
            <h1>Demos Pages</h1>
            <nav>
                <Link to="../demos">Demo List</Link>
                <Link to="articles">Articles</Link>
                <Link to="search-sort">Search and Sort Posts</Link>
                <Link to="fetch">Fetch</Link>
                <Link to="infinity">Infinity List</Link>
            </nav>
            <Outlet/>
        </div>
    )
}

export default App;
