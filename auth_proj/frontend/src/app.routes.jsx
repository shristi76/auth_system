import {createBrowserRouter} from "react-router";
import Login from './feature/auth/pages/Login';
import Register from './feature/auth/pages/Register';
import Protected from './feature/auth/components/protected';




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
        element:<Protected><h1 className="home">welcome to Dashboard</h1></Protected>
    }
])