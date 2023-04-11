import styles from './PageLoader.module.css';

const PageLoader = () => {
    return (
        // <div className={styles.wrapper}>
        //     <div className={styles.circle}></div>
        //     <div className={styles.circle}></div>
        //     <div className={styles.circle}></div>
        //     <div className={styles.shadow}></div>
        //     <div className={styles.shadow}></div>
        //     <div className={styles.shadow}></div>
        //     {/* <span>Loading</span> */}
        // </div>

        <div className='bg-black/25 w-full h-screen fixed left-0 z-50 top-0'>
            <div className="flex items-center justify-center space-x-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
            </div>
        </div>
    );
};

export default PageLoader;