import { AiOutlineRight } from 'react-icons/ai';

const MentorSection = ({ setIsMentorHovered }) => {
    return (
        <section onMouseLeave={() => setIsMentorHovered(false)} className='absolute top-16 left-0 w-full bg-white shadow border p-10 flex gap-16 z-50 rounded-b-lg'>
            <div className='w-3/12'>
                <h1 className='text-xl font-bold mb-1.5'>Meet Our Mentors</h1>
                <p className='text-sm text-gray-600'>Get consultant your project and boost the speed!</p>
            </div>
            <div className='w-8/12 grid grid-cols-2 gap-16'>
                <div className='flex gap-4'>
                    <img className="w-16 h-24 object-cover object-top rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" alt="" />
                    <div className='flex-1'>
                        <h4 className='font-medium'>Angelina Jolie</h4>
                        <p className='text-sm leading-tight mb-1.5 mt-1'>Lorem ipsum dolor sit amet.</p>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum consequuntur animi totam doloremque cupiditate perspiciatis est ex eveniet sint dolor!</p>
                        <button type='button' className='mt-3 text-sm flex items-center gap-2 uppercase hover:text-blue-700 font-medium'>Book Session <AiOutlineRight /></button>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img className="w-16 h-24 object-cover object-top rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" alt="" />
                    <div className='flex-1'>
                        <h4 className='font-medium'>Angelina Jolie</h4>
                        <p className='text-sm leading-tight mb-1.5 mt-1'>Lorem ipsum dolor sit amet.</p>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum consequuntur animi totam doloremque cupiditate perspiciatis est ex eveniet sint dolor!</p>
                        <button type='button' className='mt-3 text-sm flex items-center gap-2 uppercase hover:text-blue-700 font-medium'>Book Session <AiOutlineRight /></button>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img className="w-16 h-24 object-cover object-top rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" alt="" />
                    <div className='flex-1'>
                        <h4 className='font-medium'>Angelina Jolie</h4>
                        <p className='text-sm leading-tight mb-1.5 mt-1'>Lorem ipsum dolor sit amet.</p>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum consequuntur animi totam doloremque cupiditate perspiciatis est ex eveniet sint dolor!</p>
                        <button type='button' className='mt-3 text-sm flex items-center gap-2 uppercase hover:text-blue-700 font-medium'>Book Session <AiOutlineRight /></button>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img className="w-16 h-24 object-cover object-top rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" alt="" />
                    <div className='flex-1'>
                        <h4 className='font-medium'>Angelina Jolie</h4>
                        <p className='text-sm leading-tight mb-1.5 mt-1'>Lorem ipsum dolor sit amet.</p>
                        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum consequuntur animi totam doloremque cupiditate perspiciatis est ex eveniet sint dolor!</p>
                        <button type='button' className='mt-3 text-sm flex items-center gap-2 uppercase hover:text-blue-700 font-medium'>Book Session <AiOutlineRight /></button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentorSection;