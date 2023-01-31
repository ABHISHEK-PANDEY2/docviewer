import loader from "../images/loader.png"
import styles from "./styles.module.css"
const Loader = () => {
    return ( 
        <div className={styles.loader}>
            <img className={styles.loaderimg} src={loader} alt="" />
        </div>
     );
}
 
export default Loader;