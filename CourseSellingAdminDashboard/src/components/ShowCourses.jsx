import { Button, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:3000/admin/courses/",
            {
                headers:{
                "authorization" : "Bearer "+localStorage.getItem('token'),
                "Content-Type" : "application/json"
            }
        }
    ).then((response)=>{
           
            setCourses(response.data.courses);
        })
    },[]);
    
    return <div>
    <div><Typography variant="h4" textAlign={"center"}>Courses</Typography></div>
    <div style={{display:"flex",flexFlow:"row wrap",justifyContent:"center", padding:10}}>
        
        {courses.map(c => <Course title={c.title} description={c.description} image={c.imageLink}  id={c._id}/>)}
    </div>
    </div>
}

export function Course(props) {
    const navigate=useNavigate();
    return <Card variant="outlined" style={{margin:10,minHeight:300,width:300,display:"flex", flexFlow:"column",justifyContent:"center" , borderRadius:10,padding:10 , borderWidth:1 , borderColor:'#337fd3',}}>
          
        <img src={props.image} alt="Image Loading" style={{width:300,height:200, borderRadius:10}}/>
        <Typography variant="h6" textAlign={"center"}>{props.title}</Typography>
        <Typography variant="subtitle1" textAlign={"center"}>{props.description}</Typography>
        <div style={{display:'flex', justifyContent:"center", flexFlow:"row",paddingBottom:10}}>
        <Button variant="outlined" style={{marginRight:10}} onClick={()=>{
            navigate("/courses/"+props.id);
        }}>Edit</Button>
        <Button variant="outlined" color="error" onClick={async()=>{
            const response = await axios.delete('http://localhost:3000/admin/courses/'+props.id,{
                headers:{
                    "Authorization":"Bearer " + localStorage.getItem('token'),
                    "Content-Type" : "application/json"
                }
            })
            alert(response.data.message)
            window.location="/courses";
        }} >delete</Button>
        </div>
        </Card>
}

export default ShowCourses;