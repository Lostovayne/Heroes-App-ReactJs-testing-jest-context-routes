import { useReducer } from "react";
import { AuthContext, authReducer } from "./";
import { types } from "../types/types";

// estado inicial antes de que se usara la funcion

// const initialState = {
//     logged: false,
// };

// Funcion de inicializacion

const init = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
        logged: !!user,
        user,
    };
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {}, init);

    const login = (name = "") => {
        const action = {
            type: types.login,
            payload: {
                id: "ABC",
                name,
            },
        };

        localStorage.setItem("user", JSON.stringify(action.payload));

        dispatch(action);
    };

    const logout = () => {
        const action = {
            type: types.logout,
        };

        localStorage.removeItem("user");

        dispatch(action);
    };

    return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>;
};
