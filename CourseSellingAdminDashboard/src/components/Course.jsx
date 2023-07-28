import React, { useState } from 'react';
import { useEffect } from 'react';
import { TextField,Button,Card,MenuItem, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue,useSetRecoilState } from 'recoil';
import { courseState } from '../../store/atoms/course';
import {courseTitle,coursePrice,isCourseLoading,courseImage,courseDescription,coursePublished } from '../../store/selectors/course';

function Course(){
    let {courseId} = useParams();
    const setCourse = useSetRecoilState(courseState);
    const isLoading = useRecoilValue(isCourseLoading);
    useEffect(()=>{
        axios.get("http://localhost:3000/admin/courses/"+courseId,
        {
            headers:{
                "Authorization" : "Bearer " + localStorage.getItem('token'),
                'Content-Type': "application/json"
            }
        }).then((response)=>{
            setCourse({
                isLoading : false,
                course : response.data.course
            });
            console.log("HI from course")
        })
        .catch((e)=>{
            setCourse({
                    isLoading : true,
                    course : null
            });
            
        });
    },[])
    
    if(isLoading){
        return <div>Loading...</div>
    }

    return<div>
    <GreyTopper ></GreyTopper>
     <div style={{display:'flex',justifyContent:'space-around',flexFlow:'row wrap'}}>
     <UpdateCard />
     <CourseCard/>
        
    </div>
    </div>
}
function UpdateCard(){
    const [courseDetails,setCourse] = useRecoilState(courseState);
    console.log(courseDetails);
    const [title,setTitle]=useState(useRecoilValue(courseTitle));
    const [description,setDescription]=useState(useRecoilValue(courseDescription));
    const [image,setImage]=useState(useRecoilValue(courseImage));
    const [price,setPrice]=useState(useRecoilValue(coursePrice));
    const [published,setPublished]=useState(useRecoilValue(coursePublished));
    return <div style={{display:"flex",justifyContent:"center",marginTop:50}}>
    <div style={{display:"flex",padding:"10",flexFlow:"column"}}>
     <Card style={{display:"flex",flexFlow:"column wrap",padding : 15,width:300}}>
     <TextField id="outlined-basic" style={{marginBottom:7}} value={title} label="Title" variant="outlined" size="medium" onChange={(e)=>{setTitle(e.target.value)}}/>

     <TextField id="outlined-basic" style={{marginBottom:7}} value={description} label="Description" variant="outlined" size="medium" onChange={(e)=>{setDescription(e.target.value)}}/>

     <TextField id="outlined-basic" style={{marginBottom:7}} value={price} label="Price" variant="outlined" size="medium" onChange={(e)=>{setPrice(e.target.value)}}/>

     <TextField id="outlined-basic" style={{marginBottom:7}} value={image} label="Image Link" variant="outlined" size="medium" onChange={(e)=>{setImage(e.target.value)}}/>

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
       await axios.put('http://localhost:3000/admin/courses/'+courseDetails.course._id,{
        title : title,
        description : description,
        price : price,
        imageLink : image,
        published : published
       }
        ,{
         headers:{
           "Authorization": "Bearer "+localStorage.getItem('token'),
           "Content-type":"application/json"
         }});
    
        const updatedCourse = {
            _id : courseDetails.course._id,
            title : title,
            description : description,
            price : price,
            imageLink : image,
            published : published
        };
        setCourse({isLoading:false,course : updatedCourse})
       
     }}>Update Course</Button>
     </Card>
 </div>
 </div>
}
function CourseCard(){
    const title = useRecoilValue(courseTitle);
    const price = useRecoilValue(coursePrice);
    // const description = useRecoilValue(courseDescription);
    const image = useRecoilValue(courseImage);
    // const published = useRecoilValue(coursePublished);
return <div style={{zIndex:1,marginTop:-150}}>
<Card variant='outlined' style={{width:300,marginRight:-150,minHeight:200}}>
<div style={{display:'flex',justifyContent:'center'}}>
<img src={image} style={{width:300,height:170}}></img>
</div>
<Typography variant='h5' textAlign={'center'}>{title}</Typography>

{/* <Typography variant='subtitle2' textAlign={'center'}>{props.course.description}</Typography>
<br /> */}
<Typography variant ='subtitle2' textAlign={'center'} style={{color:"grey"}}>Price: {price}</Typography>
</Card>
</div>
}
function GreyTopper(){
    const title = useRecoilValue(courseTitle);
    return <div style={{backgroundColor: "#050001",height:200,marginTop:5,zIndex:0}}>
        <div style={{display:'flex',justifyContent:'center',flexFlow:'column'}}>
            <div style={{marginTop:70}}>
        <Typography style={{color:'white',fontWeight:600}} variant='h3'textAlign={'center'} >{title}</Typography>
    </div>
    </div>
    </div>
}
export default Course;