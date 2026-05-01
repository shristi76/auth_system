import { useauth } from "../hooks/useauth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

import React from 'react'

//protected 
const Protected = ({children}) => {

    const {loading,user}=useauth();
    const navigate=useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [loading, user, navigate]);

    if(loading)
    {
        return (<main><h1>loading.........</h1></main>)
    }

    if(!user)
    {
        return null;
    }

  return children
}

export default Protected
