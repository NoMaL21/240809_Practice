import React from "react";
import { Container, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Link } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check'; // 체크표시 아이콘
import ClearIcon from '@mui/icons-material/Clear'; // X표시 아이콘
import { kakaoauthcode, userstatus } from './service/ApiService'; // kakaoauthcode 추가

const kakao_client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;

class Mypage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",  
            email: "", 
            kakaoauth: false 
        };
    }

    componentDidMount() {
        // 유저 상태를 서버로부터 받아옴
        userstatus()
            .then((response) => {
                this.setState({
                    username: response.username,
                    email: response.email,
                    kakaoauth: response.isKakaoAuthenticated
                });
            })
            .catch((error) => {
                console.log("유저 상태 로딩 실패:", error);
            });

        // 현재 URL에서 code 파라미터 추출
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get('code');
        
        if (authCode) {
            // 카카오 인증 코드가 있으면 백엔드로 전송
            kakaoauthcode(authCode)
                .then(() => {
                    // 인증 성공 시 kakaoauth를 true로 변경
                    this.setState({ kakaoauth: true });
                })
                .catch(() => {
                    // 인증 실패 시 kakaoauth를 false로 유지
                    this.setState({ kakaoauth: false });
                });
        }
    }

    render(){
        const { username, email, kakaoauth } = this.state;
        const kakaoredirectUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_client_id}&redirect_uri=http://localhost:3000/mypage&response_type=code&scope=profile_nickname,friends,talk_message`;

        return (
            <Container component="main" maxWidth="sm" style={{ marginTop: "8%" }}>
                <Grid container spacing={2} justify="center">
                    <Typography component="h1" variant="h5">
                        마이페이지
                    </Typography>
                </Grid>
                <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    유저명
                                </TableCell>
                                <TableCell align="left">{username}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    이메일
                                </TableCell>
                                <TableCell align="left">{email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    카카오톡 인증
                                </TableCell>
                                <TableCell align="left">
                                    {kakaoauth ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Link href={kakaoredirectUrl} variant="body2">
                                        카카오톡 인증 페이지
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
}

export default Mypage;
