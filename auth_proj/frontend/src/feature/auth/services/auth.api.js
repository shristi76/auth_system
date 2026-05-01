import axios from 'axios';

//sochoo backend pr  humnai 4 api banaye hai
//register ,login, logout ,get-user
//pehlai kaam krtai hai register pr
//aab sochoo ki register kai liye kon kon sa data chahiye username,email,password
//aab ek function banaoo jo frontend sai yeh info lekrr backend mai bhejai



//url mai backend ka url daalna
//dekho jab backend mai token create hoga toh wo usko cookie mai bhi set krega
//pr frontend mai axios mai cookie ka access nahi hota by default
//issiliye humlog ek flag daaltai hai withCrendential:true
// export async function register({username,email,password})
// {
// try{
//    const response= await axios.post('http://localhost:3000/api/auth/register',{username,email,password},
//     {
//     withCredentials:true
// })

// return response.data;

// }

// catch(err)
// {
// console.log(err);
// }
// }


// export async function login({email,password})
// {
//     try{
//         const respose=await axios.post('http://localhost:3000/api/auth/login',{email,password},{withCredentials:true})
//         return response.data;
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// }

// export async function logout()
// {
//     try{

//         const response=await axios.get('http://localhost:3000/api/auth/logout',{
//             withCredentials:true
//         })
//         return response.data;
//     }
//     catch(err)
//     {
//         console.log(err)
//     }
// }


// export async function getme()
// {
//     try{
//         const response =await axios.get('http://localhost:3000/api/auth/get-me',{withCredentials:true})
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }

//aab sochoo with credentials ka code baar baar repeatetive hoo raha hai
//toh isko avoid krnai kai liye axios ka ek instance create kroo

const api=axios.create({
    baseURL:'https://auth-system-wvgc.onrender.com/',
    withCredentials:true
})



export async function register({username,email,password})
{
try{
   const response= await api.post('/api/auth/register',{username,email,password})


return response.data;

}

catch(err)
{
console.log(err);
throw err;
}
}


export async function login({email,password})
{
    try{
        const response=await api.post('/api/auth/login',{email,password})
        return response.data;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

export async function logout()
{
    try{

        const response=await api.get('/api/auth/logout')
        return response.data;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}


export async function getme()
{
    try{
        const response =await api.get('/api/auth/get-me')
        return response.data;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}