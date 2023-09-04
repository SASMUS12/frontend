import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './RequireAuth/RequireAuth';

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
const FillOutProfilePage1 = lazy(
  () => import('./FillOutProfilePages/FillOutProfilePage1/FillOutProfilePage1'),
);
const FillOutProfilePage2 = lazy(
  () => import('./FillOutProfilePages/FillOutProfilePage2/FillOutProfilePage2'),
);
const FillOutProfilePage3 = lazy(
  () => import('./FillOutProfilePages/FillOutProfilePage3/FillOutProfilePage3'),
);
const FillOutProfilePage4 = lazy(
  () => import('./FillOutProfilePages/FillOutProfilePage4/FillOutProfilePage4'),
);
const FillOutProfilePage5 = lazy(
  () => import('./FillOutProfilePages/FillOutProfilePage5/FillOutProfilePage5'),
);
const FillOutProfilePage6 = lazy(
  () => import('./FillOutProfilePages/FillOutProfilePage6/FillOutProfilePage6'),
);
const ChatsPage = lazy(() => import("./Chats/Chats"));
export const Routing = () => {
  return (
    <Routes>
      {/*<Route path={'/'} element={<RequireAuth />}>*/}
      <Route path="/fill-out-1" element={<FillOutProfilePage1 />} />
      <Route path="/fill-out-2" element={<FillOutProfilePage2 />} />
      <Route path="/fill-out-3" element={<FillOutProfilePage3 />} />
      <Route path="/fill-out-4" element={<FillOutProfilePage4 />} />
      <Route path="/fill-out-5" element={<FillOutProfilePage5 />} />
      <Route path="/fill-out-6" element={<FillOutProfilePage6 />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chats" element={<ChatsPage />} />
      {/*</Route>*/}
      <Route path='/signin' element={<SignInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/' element={<MainPage />} />
      <Route path='/faq' element={<FAQPage />} />
      <Route path='/reviews' element={<ReviewsPage />} />
      <Route path='/policy' element={<PolicyPage />} />
      <Route path='/rules' element={<RulesPage />} />
      <Route path='/agreement' element={<AgreementPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
