import axios from 'axios';
import { useEffect } from 'react';
import { userState } from '../../store/atoms/user';
import { useSetRecoilState } from 'recoil';
import {useNavigate} from 'react-router-dom';
function Init(){
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    const initUser=async()=>{
       try{
        const response = await axios.get('http://localhost:3000/admin/me',
        {
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')
            }
        })
        console.log(response.data);
    
        if(response.data.username){
            setUser({
                isLoading: false,
                userEmail: response.data.username
            })
        }
        else{
            setUser({
                isLoading: true,
                userEmail: null
            })
        }
    }
    catch(e){
        setUser({
            isLoading:true,
            userEmail:null
        }),
        navigate('/');
    }
}
    useEffect(()=>{
        initUser();
    },[]);
    return <></>;
}
export default Init;