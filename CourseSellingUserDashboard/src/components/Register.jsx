import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../../store/atoms/user";
import { useNavigate } from "react-router-dom";
import { Typography,Button,TextField,Card } from "@mui/material";
import axios from 'axios';
function Register(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
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
        const response = await axios.post('http://localhost:3000/user/signup',
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