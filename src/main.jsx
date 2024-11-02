import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeContextProvider } from './theme/ThemeContextProvider';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './error-page.jsx';
import Seasonal from './Seasonal.jsx';
import Search from './Search.jsx';
import Anime from './Anime.jsx';
import SignIn from './SignIn.jsx';
import TestSignIn from './TestSignIn.jsx';
import Profile from './Profile.jsx';
import { AuthContextProvider } from './auth/AuthContext.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/seasonal",
    element: <Seasonal />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search",
    element: <Search />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/anime/:id",
    element: <Anime />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signin',
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: '/testSigin',
    element: <TestSignIn />,
    errorElement: <ErrorPage />
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
