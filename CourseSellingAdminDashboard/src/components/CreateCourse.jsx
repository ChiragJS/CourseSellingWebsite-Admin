import React from "react";
import { TextField,useRadioGroup,Select,MenuItem, Card,Button } from "@mui/material";
import axios from 'axios';
import {useNavigate } from "react-router-dom";
function CreateCourse() {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState("");
    const [description,setDescription]=React.useState("");
    const [price,setPrice]=React.useState("");
    const [published , setPublished]=React.useState(false);
    const [image,setImage]=React.useState("");
    return <div style={{display:"flex",justifyContent:"center"}}>
       <div style={{display:"flex",padding:"10",flexFlow:"column"}}>
        <h1>Create Course Page</h1>
        <Card style={{display:"flex",flexFlow:"column wrap",padding : 15}}>
        <TextField id="outlined-basic" label="Title" variant="outlined" size="medium" onChange={(e)=>{setTitle(e.target.value)}}/>
        <br />
        <TextField id="outlined-basic" label="Description" variant="outlined" size="medium" onChange={(e)=>{setDescription(e.target.value)}}/>
        <br />
        <TextField id="outlined-basic" label="Price" variant="outlined" size="medium" onChange={(e)=>{setPrice(e.target.value)}}/>
        <br />
        <TextField id="outlined-basic" label="Image Link" variant="outlined" size="medium" onChange={(e)=>{setImage(e.target.value)}}/>
        <br />
        <TextField
        value={published}
    select
    label="Publish"
    onChange={(e)=>{setPublished(e.target.value)}}
  >
    <MenuItem key={1} value={true}>True</MenuItem>
    <MenuItem key={2} value={false}>False</MenuItem>
  </TextField>
       <br />
        <Button variant="contained" onClick={async() => {
          const response = await axios.post('http://localhost:3000/admin/courses',{
              title : title,
              description : description,
              price : price,
              imageLink : image,
              published : published
          },
            {
            headers:{
              "Authorization": "Bearer "+localStorage.getItem('token'),
              "Content-type":"application/json"
            }});
          
            console.log("hi from response promise")
             alert(response.data.message);
             navigate('/courses');
          }
          
          }>Create Course</Button>
        </Card>
    </div>
    </div>
}
export default CreateCourse;