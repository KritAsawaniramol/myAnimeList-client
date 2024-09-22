import React, { createContext, useState, useContext } from 'react'
import {
    setAccessToken,
    setCredentialID,
    setRefreshToken,
    setIsUserLoggedIn,
    getIsUserLoggedIn,
    removeAccessToken,
    removeRefreshToken,
    removeCredentialID,
    removeIsUserLoggedIn,
} from './authClientStore';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error("useAuth must be within AuthContextProvider")
    }
    return ctx
}

export const AuthContextProvider = ({ children }) => {
    console.log("AuthContextProvider");
    const [isAuthenticated, setIsAuthenticated] = useState(getIsUserLoggedIn());
    const isUserLoggedIn = Cookies.get("is_user_logged_in")
    console.log(isUserLoggedIn);
    console.log(isAuthenticated);
    if (!isAuthenticated && isUserLoggedIn) {
        console.log("new login");
        const newAccessToken = Cookies.get("access_token")
        const newRefreshToken = Cookies.get("refresh_token")
        const newCredentialID = Cookies.get("credential_id")
        console.log(newAccessToken);
        console.log(newRefreshToken);
        console.log(newCredentialID);
        if (newAccessToken && newRefreshToken && newCredentialID) {
            setIsAuthenticated(true)
            setIsUserLoggedIn("1")
            console.log("setAccessToken");
            setAccessToken(newAccessToken)
            setRefreshToken(newRefreshToken)
            setCredentialID(newCredentialID)
            Cookies.remove("is_user_logged_in")
            Cookies.remove("access_token")
            Cookies.remove("refresh_token")
            Cookies.remove("credential_id")
        }
    } else if (isAuthenticated) {
        console.log("logged in");
    } else {
        console.log("didn't log in");
    }


    // const [accessToken, setAccessToken] = useState(newAccessToken ? newAccessToken : "")

    const logout = () => {
        removeAccessToken()
        removeRefreshToken()
        removeCredentialID()
        removeIsUserLoggedIn()
        setIsAuthenticated(false)
        window.location.reload()
    }

    return (
        <AuthContext.Provider value={{ logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
