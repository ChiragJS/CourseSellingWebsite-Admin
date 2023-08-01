import axios from 'axios';
import { CardMedia, Typography,Card, CardContent, Button } from '@mui/material';
import { courseState } from '../../store/atoms/course';
import { useParams } from 'react-router-dom';
import {useSetRecoilState,useRecoilValue} from 'recoil';
import { isCourseLoading,courseTitle, courseImage, coursePrice, courseDescription } from '../../store/selectors/course';
import { useEffect } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DescriptionIcon from '@mui/icons-material/Description';
function Course(){
    console.log("hi from course");
    const {courseId} = useParams();
    const setCourse = useSetRecoilState(courseState);
    const isLoading = useRecoilValue(isCourseLoading);
    useEffect(()=>{
        axios.get("http://localhost:3000/user/courses/"+courseId,
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
   <GreyTopper />
   <div style={{display:'flex',flexFlow:'row wrap',justifyContent:'space-around'}}>
    
   <DetailsCard />
   
    <CourseCard />
    
   </div>
    </div>
}
function GreyTopper(){
 const title = useRecoilValue(courseTitle);
 return <div style={{marginLeft:-8,zIndex:-1}}>
      <div style={{backgroundColor: "#1c1d1f",height:200,marginTop:5,zIndex:0,width:"100vw"}}>
        <div style={{display:'flex',justifyContent:'center',flexFlow:'column'}}>
            <div style={{marginTop:70}}>
        <Typography style={{color:'white',fontWeight:600}} variant='h3'textAlign={'center'} >{title}</Typography>
    </div>
    </div>
    </div>
 </div>
}
function CourseCard(){
    const image = useRecoilValue(courseImage);
    const price = useRecoilValue(coursePrice);

     return <Card style={{width:400, borderRadius:40,marginTop:-150,height:270}}>
        <CardMedia component="img"
        height="200"
        image={image}
        alt="Course Image"
        />
        <CardContent>
        <div style={{display:'flex', flexFlow:'row',justifyContent:'space-evenly'}}>
        <Typography variant="h6" align="left" style={{fontWeight:500}}>${price}</Typography>
        <div style={{display:'flex', flexFlow:'row'}}>
        <Button variant='contained' color='success' size='medium' style={{marginRight:5}}>Buy Now</Button>
        <Button variant='contained' color='secondary' size='medium' startIcon={<AddShoppingCartIcon />}>Cart</Button>
        </div>
        </div>
        </CardContent>
     </Card>
}

function DetailsCard(){
    const description= useRecoilValue(courseDescription);
    return <div>
        <Card style={{width:600,backgroundColor:"#b9a7a2",marginTop:20, minHeight:400,borderRadius:30}}>
           <CardContent>
            <div style={{display:'flex',flexFlow:"row wrap"}}> 
            <DescriptionIcon style={{color:'white'}} /><Typography variant="body1" style={{marginLeft:10,color:'white',fontSize:17}}>{description}</Typography>
            </div> 
            </CardContent>
        </Card>
    </div>

}
export default Course;