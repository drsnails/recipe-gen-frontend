
import './assets/scss/global.scss';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Route, Routes, useNavigate } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoginSignup } from './pages/LoginSignup';
import { AppHeader } from './cmps/AppHeader';
import { ToastMessage } from './cmps/ToastMessage';
import { Home } from './pages/Home';
import { PrivateRoute } from './cmps/PrivateRoute';
import RecipeEditor from './pages/RecipeEditor';
import { useEffect } from 'react';
import { userService } from './services/userService';
import { useDispatch } from 'react-redux';
import { login, setUser } from './store/actions/userActions';
import { ConfirmDialog } from './cmps/ConfirmDialog';
import { Loader } from './cmps/Loader';

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

        </main>
        <ToastMessage />
        <ConfirmDialog />
        <Loader />
      </Router>
    </>

  );
}

export default App;
