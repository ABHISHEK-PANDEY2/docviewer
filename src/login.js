import {GoogleLogin} from 'react-google-login'
import { gapi } from 'gapi-script'
const clientId = "73858745093-907hvi4gtubhhkuvu7c0470ui6qd4tl2.apps.googleusercontent.com"

const Login = () => {

    const onSuccess = (res) => {
        console.log(res.profileObj);
        
    const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token

    console.log(accessToken);
    
    window.location.href = "/"
    }

    const onFaliure = () => {
        console.log("Failed");
    }

    return (
        <div id="signInButton">
            <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFaliure={onFaliure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            >
            </GoogleLogin>
        </div>
    )
}

export default Login