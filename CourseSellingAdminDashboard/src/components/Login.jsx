import React from "react";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { Card } from '@mui/material';
import axios from 'axios';
import { userState } from "../../store/atoms/user";
import { useSetRecoilState } from "recoil";
import {useNavigate } from "react-router-dom";
import {Alert} from '@mui/material';


function Login() {
    const [email, setEmail] = React.useState("");
    const [password,setPassword]=React.useState("");
    const [error,setError]= React.useState(false);
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    return <div style={{paddingTop:150}}>
        <center>
        <Typography variant = "h4">Login to admin dashboard</Typography>
        <Card variant="outlined" style={{width:400,padding:20,display: "flex",flexDirection:"column",borderRadius:10}}>
        {error && <Alert severity="error" style={{marginBottom:7,padding:0}}>Wrong Email/Password Field</Alert>}
        <TextField id="outlined-basic" label="Email" variant="outlined" size="medium" value={email} onChange={(e)=>{
            setEmail(e.target.value);
        }}/>
        <br/>
        <TextField className = "PassWord" id="outlined-basic" label="Password" variant="outlined" size="medium" type='password' value={password} onKeyDown={(e)=>{ 
            const submitButton = document.querySelector('.LoginButton');
            if (e.keyCode===13)
            submitButton.click();
        }} onChange={(e)=>{
            setPassword(e.target.value);
            }}/>
        <br />
        <Button className="LoginButton" variant="contained" onClick={async()=>{
            try{
            const response = await axios.post('http://localhost:3000/admin/login',{},
            {
                headers:{
                    username : email,
                    password : password,
                    "Content-Type" : "application/json"
                    
                }
            });
                    console.log(response.data.message);
                    localStorage.setItem('token',response.data.token);
                    
                    setUser({
                        isLoading : false,
                        userEmail : email
                    })
                    navigate('/');
                }
                catch(e){
                    console.log("hi from error");
                    setError(true);
                    setEmail("");
                    setPassword("");
                }
                }
            
        } >Login</Button>
        <br/>
        New here? <a href="/register">Register</a>
        </Card>
        </center>
    </div>
}

export default Login;