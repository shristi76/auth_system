import {createBrowserRouter} from "react-router";
import Login from './feature/auth/pages/Login';
import Register from './feature/auth/pages/Register';
import Protected from './feature/auth/components/protected';
import Home from './feature/auth/pages/Home';




export const router=createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },

    {
        path:'/',
        element:<Protected><Home/></Protected>
    }
])