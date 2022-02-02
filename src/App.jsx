import './assets/scss/global.scss';

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

function App() {
  const dispatch = useDispatch()
  dispatch(setUser())


  return (
    <>
      <Router>
        <AppHeader />
        <ToastMessage />
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
      </Router>
    </>

  );
}

export default App;
