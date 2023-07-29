import { Typography,Grid,Button } from "@mui/material";
import {useNavigate } from "react-router-dom";
import { userEmailState } from "../../store/selectors/user";
import { useRecoilValue } from "recoil";
import { isUserLoading } from "../../store/selectors/user";

function Landing(){
    const userEmail = useRecoilValue(userEmailState);
    console.log(userEmail);
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isUserLoading);
    return  <div>
        <Grid container style={{padding: "5vw"}}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{marginTop: 100}}>
                    <Typography variant={"h2"}>
                        Coursera Admin
                    </Typography>
                    <Typography variant={"h5"}>
                        A place to learn, earn and grow
                    </Typography>
                    { userLoading && !userEmail && <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/register")
                                }}
                            >Sign up</Button>
                        </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/login")
                                }}
                            >Sign in</Button>
                        </div>
                    </div>}
                </div>
                <div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img src={"../teacher-student.png"} width={"100%"} style={{borderRadius:150}}/>
            </Grid>
        </Grid>
    </div>
}
export default Landing;