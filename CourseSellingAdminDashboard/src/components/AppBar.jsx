import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import zIndex from "@mui/material/styles/zIndex";
import { userEmailState } from "../../store/selectors/user";
import { isUserLoading } from "../../store/selectors/user";
import { userState } from "../../store/atoms/user";
import { useSetRecoilState,useRecoilValue } from "recoil";
function AppBar() {
    const navigate = useNavigate();
    const[userName,setUserName]=React.useState(null);
    const userEmail = useRecoilValue(userEmailState);
    const isLoading = useRecoilValue(isUserLoading);
    const setUser = useSetRecoilState(userState);

   
    // if(isLoading){
    //     return <></>
    // }

    if(userEmail){
        return <div style ={{display:"flex",justifyContent:"space-between",
        paddingTop:5,
        zIndex:1
        }}>
            <div style={{marginLeft:10}}>
           <Typography variant="h6">Coursera</Typography>
           </div>
           <div style={{display:"flex",justifyContent: "space-between"}}>
           <div>
            <Button style={{ marginRight:10} } onClick={()=>{
                navigate('/about');
            }}>Add course</Button>
           </div>
           <div>
            <Button style={{ marginRight:10} } onClick={()=>{
                navigate('/courses');
            }}>Show courses</Button>
           </div>
           
            {/* <div>
           {userName}
           </div> */}
           <div>
           <Button style={{marginRight:10}} variant="contained" onClick={()=>{
            localStorage.setItem('token',null);
            setUser({
                isLoading : true,
                userEmail: null
            });
            navigate("/")
           }}>Logout</Button>
           </div>
           </div>
        </div>
    }
    else
    {
    return <div>
        <div style ={{display:"flex",justifyContent: "space-between",paddingTop:5 }}>
        <div style={{marginLeft:10}}>
       <Typography variant="h6">Coursera</Typography>
       </div>
       <div style={{display:"flex"}}>
        <div style={{
            
        }}>
       <Button variant="contained" style={{marginRight:5}} onClick={()=>{navigate('/login')}}>Signin</Button>
       </div>
       <div style={{marginRight:10}}>
       <Button variant="contained" onClick={()=>{navigate('/register')}}>Signup</Button>
       </div>
       </div>
    </div>
    </div>
    }
    
}

export default AppBar;