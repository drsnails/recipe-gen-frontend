
import './assets/scss/global.scss';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { lazy, Suspense } from 'react'

import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { LoginSignup } from './pages/LoginSignup';
import { AppHeader } from './cmps/AppHeader';
import { PrivateRoute } from './cmps/PrivateRoute';
import { useDispatch } from 'react-redux';
import { setUser } from './store/actions/userActions';
import { ConfirmDialog } from './cmps/ConfirmDialog';
import { Loader } from './cmps/Loader';

const ToastMessage = lazy(() => import('./cmps/ToastMessage'))
const Home = lazy(() => import('./pages/Home'))
const RecipeEditor = lazy(() => import('./pages/RecipeEditor'))


function App() {
    const dispatch = useDispatch()
    dispatch(setUser())

    // useEffect(()=>{
    //   document.addEventListener('visibilitychange', function() {
    //     if (document.visibilityState == 'hidden') {
    //       console.log('heyyyyyyy');
    //        // send beacon request
    //        navigator.sendBeacon('//localhost:3030/api/auth/test', {data:'data'})
    //     }
    //   });

    //   window.addEventListener('beforeunload', function() {
    //     navigator.sendBeacon('//localhost:3030/api/auth/test', {data:'data'})
    //   });

    // }, [])

    return (
        <>
            <Router>
                <AppHeader />
                <main className='container'>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            } />
                            <Route path='recipe' element={<RecipeEditor />} />
                            {/* <Route path='recipe/:id' element={<RecipeEditor />} /> */}
                            <Route path="recipe/:id" element={
                                <PrivateRoute>
                                    <RecipeEditor />
                                </PrivateRoute>
                            } />

                            <Route path="login" element={<LoginSignup />} />
                            <Route path="signin" element={<LoginSignup />} />
                        </Routes>
                    </Suspense>


                </main>
                <Suspense fallback={<div>Loading...</div>}>
                    <ToastMessage />
                </Suspense>

                <ConfirmDialog />
                <Loader />
            </Router>
        </>

    );
}

export default App;
