import { createContext, useEffect, useState } from "react";
import axios from "axios"

const AuthContext = createContext()


export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext