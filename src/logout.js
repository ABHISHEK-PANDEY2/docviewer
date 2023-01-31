import { GoogleLogout } from "react-google-login";

const clientId = "73858745093-907hvi4gtubhhkuvu7c0470ui6qd4tl2.apps.googleusercontent.com"

const Logout = () => {

    const onSuccess = () =>{
        console.log("Successfully logged out");
        window.location.href = "/login"
    }

    return ( 
        <div id="signOutButton">
            <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onSuccess}
            />
        </div>
     );
}
 
export default Logout;