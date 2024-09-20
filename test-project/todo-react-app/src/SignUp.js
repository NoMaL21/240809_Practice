import  React from "react";
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from '@mui/material';

import { signup } from "./service/ApiService";


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handle.Submit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");

        signup({email : email, username: username, password: password}).then(
            (response=>{
                window.location.href = "/login";
            })
        );
    }


    render(){
        return (
            <Container component="main" maxWidth = "xs" style={{marginTop:"8%"}}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Typography component="h1" variant="h5">
                            계정 생성
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                        <TextField
                            autoComplete="username"
                            name = "username"
                            varian="outlined"
                            required
                            fullWidth
                            id="username"
                            label="사용자 이름"
                            autoFocus
                            />
                    </Grid>
                    <Grid item xs = {12}>
                        <TextField
                            autoComplete="email"
                            name = "emaile"
                            varian="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            autoFocus
                            />
                    </Grid>
                    <Grid item xs = {12}>
                        <TextField
                            autoComplete="current-password"
                            name = "password"
                            varian="outlined"
                            required
                            fullWidth
                            id="password"
                            label="비밀번호"
                            autoFocus
                            />
                    </Grid>
                    <Grid item xs = {12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            계정 생성
                        </Button>
                    </Grid>
                    <Grid container justify="flex=end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있다면 로그인하기
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
}

export default SignUp
