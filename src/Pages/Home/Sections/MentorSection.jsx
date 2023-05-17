import { AiOutlineRight } from 'react-icons/ai';

const MentorSection = ({ setIsMentorHovered }) => {
    const mentors = [
        {
            name: "Vivek Srivastava",
            profile: "https://gumlet.assettype.com/afaqs%2Fimport%2Fall%2Fnews%2Fimages%2Fnews_story_grfx%2F2016%2F11%2F49367%2FVivek-Srivastava.jpg?auto=format%2Ccompress&w=360&dpr=2.6",
            title: "Ex-MD Global Advertising Business, Hyundai Group.",
            desc: "Brand Transformation & Strategy, Three term president of Delhi Ad Club, elected member of the Executive Committee/Board of Advertising Agencies Association of India. Innocean India, Triton, Mudra Communications."
        },
        {
            name: "Kanika Mathur",
            profile: "https://asset-cdn.campaignbrief.com/wp-content/uploads/sites/2/2017/11/05083416/Kanika20Mathur.jpg",
            title: "Ex-MD Global Advertising Business, K-Trends.",
            desc: "Digital & Brand Consultant, CMO Harappa Education, COO Mullen Lowe Singapore ( Unilever Brands), SVP Digital Dubai Tourism, Managing Director of Razorfish India, President of Digitas India, Co-founder of Solutions, McCann Erickson."
        },
    ];

    return (
        <section onMouseLeave={() => setIsMentorHovered(false)} className='absolute top-16 left-0 w-full bg-white shadow border p-10 py-16 flex flex-col gap-16 z-50 rounded-b-lg'>
            <div className='font-hero'>
                <h1 className='text-xl font-bold mb-1.5'>Meet Our Mentors</h1>
                <p className='text-sm text-gray-600'>Let's start with booking a consultancy session for your project <br /> from one of these Industry Veterans, and boost its effects!</p>
            </div>
            <div className='w-10/12 mx-auto grid grid-cols-2 gap-16'>
                {
                    mentors?.map(({ name, profile, title, desc }) => (
                        <div className='flex gap-4'>
                            <img className="w-20 h-28 shadow-md object-contain object-top rounded-full" src={profile} alt="" />
                            <div className='flex-1'>
                                <h4 className='font-medium'>{name}</h4>
                                <p className='text-sm leading-tight mb-1.5 mt-1'>{title}</p>
                                <p className='text-xs'>{desc}</p>
                                <button type='button' className='mt-3 text-sm flex items-center gap-2 uppercase hover:text-blue-700 font-medium'>Book Session <AiOutlineRight /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default MentorSection;