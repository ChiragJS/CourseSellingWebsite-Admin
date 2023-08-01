import { Button, Card, Typography,CardActionArea,CardMedia,CardContent } from "@mui/material";
import React, { useEffect } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import "../miscellaneous.css";


function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:3000/user/courses/",
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
        
        {courses.map(c => <Course title={c.title} price={c.price} image={c.imageLink}  id={c._id} />)}
    </div>
    </div>
}

export function Course(props) {
    const navigate=useNavigate();

    return <Card   onClick={()=>navigate("/courses/"+props.id)} sx={{
        width:300,
        margin:2,
        borderRadius:10
    }}>
        <div className="zoom-card">
    <CardActionArea>
      <CardMedia
        component="img"
        height="200"
        image={props.image}
        alt="Course Image"
        
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="right" style={{fontWeight:500}}>
          {props.price}
        </Typography>
      </CardContent>
    </CardActionArea>
    </div>
  </Card>
}

export default ShowCourses;