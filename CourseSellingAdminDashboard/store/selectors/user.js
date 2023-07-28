import {selector} from 'recoil';
import {userState} from '../atoms/user';
import { stepButtonClasses } from '@mui/material';

export const isUserLoading = selector({
    key : 'isUserLoadingState',
    get: ({get})=>{
        const state = get(userState);
        return state.isLoading;
    }
});

export const userEmailState = selector({
    key: 'isUserEmailState',
    get : ({get})=>{
        const state = get(userState);
        return state.userEmail;
    }
})