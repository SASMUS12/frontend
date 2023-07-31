import React from 'react';
import {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';

import InfoTooltip from "../components/InfoTooltip/InfoTooltip";
import styles from "./MainPage/MainPage.module.scss";
import {useModel} from "../components/SignUpAndSignInForm/model";

// import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const SignInPage = lazy(() => import('../pages/SignUpAndSignInPages/SignUpAndSignInPages'));
const SignUpPage = lazy(() => import('../pages/SignUpAndSignInPages/SignUpAndSignInPages'));
const MainPage = lazy(() => import('./MainPage/MainPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage/NotFoundPage'));

export const Routing = () => {
    return (
        <Routes>
            {/*<ProtectedRoute loggedIn={isLoggedIn} redirectPath="/signin" path="/">*/}
            {/*  <MainPage />*/}
            {/*</ProtectedRoute>*/}
            <Route path="/signin" element={<SignInPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/" element={<MainPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};
