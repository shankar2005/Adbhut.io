import RegisterForm from '../../Pages/Auth/RegisterForm';
import Modal from './Modal';
import { BsArrowRight } from "react-icons/bs";
import logo from "../../assets/logos/nsn-logo.png"

const SubscriptionModal = ({ subsModal, setSubsModal }) => {
    return (
        <Modal onClick={() => setSubsModal(false)} className='bg-white w-4/5 rounded-lg grid grid-cols-1 lg:grid-cols-3 overflow-y-auto scroll-none'>
            {subsModal === "basic" ? (
                <div className='col-span-2 p-16'>
                    <h6 className='text-2xl font-semibold mb-2'>Basic</h6>
                    <span className='bg-red-100 p-1 font-semibold rounded-sm'>Limited Features</span>

                    <ul className='border-b border-gray-300 pb-6 mb-6 mt-4 space-y-1'>
                        <li className='flex items-center gap-2'>
                            <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                            <span>Simple Project Work Flow</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                            <span>Single Admin Panel</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <img src="https://kissflow.com/hubfs/kissflow-branding-images/pricing-cross.svg" alt="" />
                            <span className='line-through decoration-red-600'>Access to External Creative Resources</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <img src="https://kissflow.com/hubfs/kissflow-branding-images/pricing-cross.svg" alt="" />
                            <span className='line-through decoration-red-600'>Personalised Servicing Chat Engine</span>
                        </li>
                    </ul>

                    <h6 className='text-2xl font-semibold mb-2 text-pink-500'>Try at</h6>
                    <h6 className='text-2xl font-semibold mb-2'>$90/month</h6>

                    <p className='mt-3 font-semibold text-gray-600 flex items-center gap-2 animate-vibrate hover:translate-x-2 duration-300'>Sign up and get started <BsArrowRight size={25} /></p>
                </div>) : (
                <div className='col-span-2 p-16'>
                    <h6 className='text-2xl font-semibold mb-2 flex gap-1'>
                        <span className='text-blue-600'>Enterprise</span>
                        <img className='relative -top-2' src="https://kissflow.com/hubfs/KF%20Brand%20Home/pricing-enterprice.svg" alt="" />
                    </h6>
                    <span className='bg-green-100 p-1 font-semibold rounded-sm'>Full Features</span>

                    <ul className='border-b border-gray-300 pb-6 mb-6 mt-4 space-y-1'>
                        <li className='flex items-center gap-2'>
                            <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                            <span>Custom Project Work Flows</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                            <span>Multiple Admin Panel</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                            <span>Access to External Creative Resources</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <img src="https://23517574.fs1.hubspotusercontent-na1.net/hubfs/23517574/Imported%20images/pricing-tick-1.svg" alt="" />
                            <span>Personalised Servicing Chat Engine</span>
                        </li>
                    </ul>

                    <h6 className='text-2xl font-semibold mb-2 text-pink-500'>Starting</h6>
                    <h6 className='text-2xl font-semibold mb-2'>$300/month</h6>

                    <p className='mt-3 font-semibold text-gray-600 flex items-center gap-2 animate-vibrate hover:translate-x-2 duration-300'>Sign up and get started <BsArrowRight size={25} /></p>
                </div>
            )}
            <div className='border-t lg:border-l px-6 py-10'>
                <img className='w-16 mx-auto mb-3' src={logo} alt="" />
                <h2 className="mb-3 text-2xl font-semibold text-center">Sign up an account</h2>
                <RegisterForm role={"Artist"} />
            </div>
        </Modal >
    );
};

export default SubscriptionModal;