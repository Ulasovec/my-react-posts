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
    PostsPage,
    ArticlePage,
    FetchPage,
    InfinityPage, PostPage
} from "./pages/pages";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import {createContext, useContext, useState} from "react";
import UserManagerWrapper from "./components/UserManagerWrapper";

const queryClient = new QueryClient(); // Create a react-query client
export const AppContext = createContext();

function App() {
    const [jwt, setJwt] = useState();

    return (
        <AppContext.Provider value={{jwt, setJwt}}>
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<IndexPage/>} />
                    <Route path="about" element={<About/>} />
                    <Route path="contacts" element={<Contacts/>} />
                    <Route path="testpage" element={<TestPage/>} />
                    <Route path="login" element={<LoginForm/>} />
                    <Route path="register" element={<RegisterForm isError={true} />} />
                    <Route path="demos" element={<DemosLayout/>}>
                        <Route index element={<DemosIndexPage/>} />
                        <Route path="articles" element={<ArticlesPage/>} />
                        <Route path="articles/:articleId" element={<ArticlePage/>} />
                        <Route path="posts" element={<PostsPage/>}/>
                        <Route path="posts/:postId" element={<PostPage/>}/>
                        <Route path="fetch" element={<FetchPage/>} />
                        <Route path="infinity" element={<InfinityPage/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<Whoops404/>} />
            </Routes>
        </QueryClientProvider>
        </AppContext.Provider>
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
        <header className="main__menu">
            <nav>
                <Link to="/">Главная</Link>
                <Link to="about">О нас</Link>
                <Link to="contacts">Контакты</Link>
                <Link to="demos">Demos</Link>
                <Link to="testpage">Test Page</Link>
            </nav>
            <UserManagerWrapper />
            {/*<UserManager user={{name: 'Ivan Ivanov'}}/>*/}
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
            <div className="demos">
                <nav className="demos__menu">
                    <Link to="../demos">Demo List</Link>
                    <Link to="articles">Strapi Backend</Link>
                    <Link to="posts">Search and Sort Posts</Link>
                    <Link to="fetch">Fetch</Link>
                    <Link to="infinity">Infinity List</Link>
                </nav>
                <div className="demos__content">
                    <Outlet/>
                </div>

            </div>
        </div>
    )
}

export default App;
