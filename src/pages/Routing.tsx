import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const SignInPage = lazy(() => import('./SignupSigninPage/SignupSigninPage'));
const SignUpPage = lazy(() => import('./SignupSigninPage/SignupSigninPage'));
const MainPage = lazy(() => import('./MainPage/MainPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage/NotFoundPage'));
const FAQPage = lazy(() => import('./FAQPage/FAQPage'));
const ReviewsPage = lazy(() => import('./ReviewsPage/ReviewsPage'));
const PolicyPage = lazy(() => import('./PolicyPage/PolicyPage'));
const RulesPage = lazy(() => import('./RulesPage/RulesPage'));
const AgreementPage = lazy(() => import('./AgreementPage/AgreementPage'));
const ProfilePage = lazy(() => import('./UserProfile/UserProfile'));

export const Routing = () => {
  return (
    <Routes>
      {/*<ProtectedRoute loggedIn={isLoggedIn} redirectPath="/signin" path="/">*/}
      {/*  <MainPage />*/}
      {/*</ProtectedRoute>*/}
      <Route path='/signin' element={<SignInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/' element={<MainPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/faq' element={<FAQPage />} />
      <Route path='/reviews' element={<ReviewsPage />} />
      <Route path='/policy' element={<PolicyPage />} />
      <Route path='/rules' element={<RulesPage />} />
      <Route path='/agreement' element={<AgreementPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
