import { useState, useEffect } from "react";
import adbhutGIF from '../../assets/logos/adbhutGIF.gif';

const NoInternetConnection = ({ children }) => {
    if (location.hostname === "localhost") return children;

    const [isOnline, setOnline] = useState(true);

    useEffect(() => {
        setOnline(navigator.onLine)
    }, [])

    window.addEventListener('online', () => {
        setOnline(true);
    })

    window.addEventListener('offline', () => {
        setOnline(false);
    })

    if (isOnline) {
        return children;
    } else {
        return <NoInternetPage />;
    }
};

export default NoInternetConnection;

const NoInternetPage = () => {
    return (
        <section>
            <img src={adbhutGIF} className='absolute top-0 left-0 m-5 w-28 md:w-32 mr-8' />
            <div className="h-screen flex items-center justify-center">
                <div className="font-hero text-center space-y-2">
                    <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/noconnection/default_800.png" alt="" />
                    <h3 className="text-2xl font-semibold">You appear to be offline</h3>
                    <p className="text-sm">You can't use Adbhut.io until you're connected to the Internet</p>
                    <button className="bg-blue-500 py-1.5 px-6 text-white rounded">Retry</button>
                </div>
            </div>
        </section>
    )
}