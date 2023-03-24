import styles from './PageLoader.module.css';

const PageLoader = () => {
    return (
        <div className={`mt-36 ${styles.wrapper}`}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.shadow}></div>
            <div className={styles.shadow}></div>
            <div className={styles.shadow}></div>
            {/* <span>Loading</span> */}
        </div>
    );
};

export default PageLoader;