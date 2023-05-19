import { InlineWidget, PopupButton } from 'react-calendly';
import { AiOutlineRight } from 'react-icons/ai';
import vivek from "../../../assets/mentors/vivek.png";
import kanika from "../../../assets/mentors/kanika.jpg";

const MentorSection = ({ setIsMentorHovered }) => {
    const mentors = [
        {
            name: "Vivek Srivastava",
            profile: vivek,
            title: "Ex-MD Global Advertising Business, Hyundai Group.",
            desc: "Brand Transformation & Strategy, Three term president of Delhi Ad Club, elected member of the Executive Committee/Board of Advertising Agencies Association of India. Innocean India, Triton, Mudra Communications."
        },
        {
            name: "Kanika Mathur",
            profile: kanika,
            title: "Ex-MD Global Advertising Business, K-Trends.",
            desc: "Digital & Brand Consultant, CMO Harappa Education, COO Mullen Lowe Singapore ( Unilever Brands), SVP Digital Dubai Tourism, Managing Director of Razorfish India, President of Digitas India, Co-founder of Solutions, McCann Erickson."
        },
        {
            name: "Aashish Chopra",
            profile: "https://miro.medium.com/v2/resize:fit:3150/1*_Qrx2lONZSja118b-FxFVA.jpeg",
            title: "Viral Content Expert, Ixigo.",
            desc: "Best-selling author: “Fast, Cheap & Viral”, Viral videos coach: 490M views, 79 Virals & counting. Ft. on Forbes, VP Content Writing"
        },
    ];

    return (
        <section onMouseLeave={() => setIsMentorHovered(false)} className='absolute top-16 left-0 w-full bg-white shadow border p-10 py-16 flex gap-10 z-50 rounded-b-lg'>
            <div className='w-3/12 font-hero'>
                <h1 className='text-xl font-bold mb-1.5'>Meet Our Mentors</h1>
                <p className='text-sm text-gray-600'>Let's start with booking a consultancy session for your project from one of these Industry Veterans, and boost its effects!</p>
            </div>
            <div className='w-10/12 mx-auto grid grid-cols-2 gap-12'>
                {
                    mentors?.map(({ name, profile, title, desc }) => (
                        <div className='flex gap-4'>
                            <img className="w-20 h-28 shadow-md object-cover object-top rounded-full" src={profile} alt="" />
                            <div className='flex-1'>
                                <h4 className='font-medium'>{name}</h4>
                                <p className='text-sm leading-tight mb-1.5 mt-1'>{title}</p>
                                <p className='text-xs'>{desc}</p>
                                <PopupButton
                                    url="https://calendly.com/happyhippies/adbhut-io-projects-mentorship-session"
                                    rootElement={document.getElementById("root")}
                                    text="Book Now"
                                    className='text-sm py-2 px-4 rounded mt-3 bg-slate-800 text-white shadow shadow-slate-400 font-medium font-hero uppercase'
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default MentorSection;