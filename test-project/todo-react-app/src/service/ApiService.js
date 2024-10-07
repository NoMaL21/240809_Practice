import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN1";

export function call(api, method, request){

    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    //console.log("accessToken:", accessToken);
    if(accessToken){
        headers.append("Authorization","Bearer " + accessToken);
        console.log(headers);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if(request){
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response)=>
        response.json().then((json) =>{
            const storedToken = localStorage.getItem(ACCESS_TOKEN);
            console.log("저장된 토큰:", storedToken);
            if(!response.ok){
                return Promise.reject(json);
            }            
            return json;
        })
    )
    .catch((error) => {
        console.log("ERROR OCCURRED : ");
        console.log(error.status);
        if(error.status === 403){
            window.location.href = "/login";
        }
        return Promise.reject(error);
    });
}

//로그인 서비스 메소드 signin
export function signin(userDTO){
    return call("/auth/signin","POST",userDTO)
    .then((response) => {
        if(response.token){
            //local 스토리지에 토큰 저장
            localStorage.setItem(ACCESS_TOKEN,response.token);

            window.location.href="/";

        }
    });
}

//회원 가입 요청 메소드 signup
export function signup(userDTO){
    return call("/auth/signup","POST", userDTO)
    .then((response) => {
        if(response.id){
            window.location.href="/";
        }
    })
    .catch((error) => {
        console.log("ERROR OCCURRED : ");
        console.log(error.status);
        if(error.status ===403){
            window.location.href = "/auth/signup";
        }
        return Promise.reject(error);
    });
}

//로그아웃 메소드 signout
export function signout(){
    //local 스토리지에 토큰 삭제
    localStorage.setItem(ACCESS_TOKEN,null);
    window.location.href="/";
}

// 카카오 인증 처리 메소드 kakaoauthcode
/*
export function kakaoauthcode(authCode) {
    return fetch(`${API_BASE_URL}/auth/kakao/callback`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authCode })
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    })
    .then((data) => {
        // JWT 토큰을 받아서 localStorage에 저장
        if (data.token) {
            localStorage.setItem(ACCESS_TOKEN, data.token);
        }
    })
    .catch((error) => {
        console.log("카카오 인증 실패:", error);
    });
}*/

// 카카오 인증 처리 메소드 kakaoauthcode
export function kakaoauthcode(authCode) {
    // POST 요청을 보내면서 call 함수 사용
    return call("/auth/kakao", "POST", { "kakaoauthtoken" : authCode })
    .then((response) => {
        // JWT 토큰을 받아서 localStorage에 저장
        if (response.token) {
            localStorage.setItem(ACCESS_TOKEN, response.token);
        }
    })
    .catch((error) => {
        console.log("카카오 인증 실패:", error);
    });
}

export function userstatus() {
    return call("/auth/userstatus", "GET", null); // GET 요청으로 유저 상태 받아옴
}