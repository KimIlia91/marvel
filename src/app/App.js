import { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../components/appHeader/AppHeader";
import Spinner from '../components/spinner/Spinner';

const Page404 = lazy(() => import('../pages/404Page'));
const MainPage = lazy(() => import('../pages/MainPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));

const App = () =>{
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={ <Spinner/> }>
                        <Routes>
                            <Route end path='/' element={ <MainPage/> }/>
                            <Route end path='/comics' element={ <ComicsPage/> }/>
                            <Route end path='/comics/:comicId' element={ <SingleComicPage/> }/>
                            <Route end path='*' element={ <Page404/> }/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;