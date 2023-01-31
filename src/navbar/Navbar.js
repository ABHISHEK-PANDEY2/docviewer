import Logout from "../logout";
import styles from "./styles.module.css"
import logoPic from "../images/logo 1.png"
import logoText from "../images/logo 2.png"
const Navbar = () => {
    return ( 
        <div className={styles.navbar}>
            <nav>
                <ul>
                    <li>
                        <div className={styles.logo}>
                            <img className={styles.image} src={logoPic} alt="" />
                            <img className={styles.imageText} src={logoText} alt="" />
                        </div>
                    </li>
                    <li className={styles.logout}><Logout/></li>
                </ul>
            </nav>
        </div>
     );
}
 
export default Navbar;