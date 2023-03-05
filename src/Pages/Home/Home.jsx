import { useRootContext } from '../../contexts/RootProvider';
import adbhutGIF from '../../assets/logos/adbhutGIF.gif';
import LeftAside from './LeftAside';

const Home = () => {
    const { } = useRootContext();

    return (
        <section className='h-screen lg:flex items-center justify-center'>
            <div className='relative lg:absolute top-5 left-5 md:left-16'>
                <img src={adbhutGIF} className='w-32' />
            </div>
            <div className='w-11/12 max-w-screen-xl mx-auto pt-24 pb-10 lg:pt-10 grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-20'>
                <div className='order-last w-5/6 mx-auto border rounded-lg shadow-lg'>
                    <LeftAside />
                </div>

                <div className='order-first'>
                    <h1 className='text-2xl sm:text-3xl xl:text-4xl font-bold mb-4'>
                        Creating most amazing <br />
                        creative content. Now available <br />
                        at convenience of a conversation.
                    </h1>
                    <p>
                        The Most Efficient Content Production Platform of Artists. <br />
                        Accessible to everyone via this chat. Adbhut.io, try it.
                    </p>

                    <div className='border-t border-gray-300 block pt-3 text-gray-700 mt-10'>
                        <a target="_blank" href="https://nsnco.in/" className='text-blue-600'>Learn more</a> about NsNco
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;