import logo from "../images/logo.png"
import Login from "../login";
import styles from "./styles.module.css"
const Landing = () => {
    return ( 
        <div className={styles.landing}>
            <img src={logo} className={styles.logo} />
            <div className={styles.text}>
                <span>Welcome 👋</span> <br /> Try Doc Viewer an easy way to view all your google Docs
            </div>
            
            <div className={styles.buttons}>
            <Login className={styles.google}/>
            <button className={styles.button}> Get Started </button>
            </div>
            
        </div>
     );
}
 
export default Landing;