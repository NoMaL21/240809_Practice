let backendHost;

const backendIp = process.env.REACT_APP_BACKEND_IP;
const hostname = window && window.location && window.location.hostname;

console.log("hostname", hostname);

if(hostname === "localhost"){
    //backendHost = "http://localhost:8080";
    backendHost = backendIp;
} else {
    backendHost = backendIp;
}

export const API_BASE_URL = `${backendHost}`;