import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {CartPage} from "../pages/cartPage/CartPage";
import { FarmerProfile } from '../pages/farmerProfile/FarmerProfile';
import { Home } from '../pages/Home/home'
import { Layout } from '../components/Layout';
import { Login } from '../pages/login/Login';
import React from 'react';

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path='/'
        element={(
          <Layout>
            <Login isLogin/>
          </Layout>
        )}
      />

      <Route path='/cadastro'
        element={(
          <Layout>
            <Login isLogin={false} />
          </Layout>
        )}
      />

      <Route path='/home'
        element={(
          <Layout>
            <Home />
          </Layout>
        )}
      />

      <Route path='kart'
        element={(
          <Layout>
            <CartPage />
          </Layout>
        )}
      />

      <Route path='farmer-profile'
        element={(
          <Layout>
            <FarmerProfile />
          </Layout>
        )}
      />
    </Routes>
  </Router>
);
