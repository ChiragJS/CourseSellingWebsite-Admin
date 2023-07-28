import React from "react";
import Button from "@mui/material/Button";
import { TextField, Typography, rgbToHex } from "@mui/material";
import { Card } from '@mui/material';
import axios from 'axios';
import { Navigate,useNavigate } from "react-router-dom";
import { useSetRecoilState} from "recoil";
import { userState } from "../../store/atoms/user";


function Register() {
    const [email, setEmail] = React.useState("");
    const [password,setPassword]=React.useState("");
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    return <div style={{paddingTop:150}}>
    <center>
    <Typography variant = "h4">Register</Typography>
    <Card variant="outlined" style={{width:400,padding:20,display: "flex",flexDirection:"column"}}>
    
    <TextField id="outlined-basic" label="Email" variant="outlined" size="medium" onChange={(e)=>{
        setEmail(e.target.value);
    }} />
    <br/>
    <TextField id="outlined-basic" label="Password" variant="outlined" size="medium" type="password" onChange={(e)=>{
        setPassword(e.target.value);
    }} />
    <br />
    <Button variant="contained"  onClick={async()=>{
        const response = await axios.post('http://localhost:3000/admin/signup',
                {
                    username : email,
                    password : password
                },
                {headers:{
                    "Content-type":"application/json"
                }}
            )
                    localStorage.setItem('token',response.data.token);
                    alert(response.data.message);
                    console.log(response.data.token);
                    setUser({
                        isLoading: false,
                        userEmail: email
                    });
                    navigate('/');
            }}> Register</Button>
    <br/>
    Account already exists!? <a href="/login">Login</a>
    </Card>
    </center>
</div>

}

export default Register;