import shankar from "../../../assets/team/shankar.jpg";
import maruf from "../../../assets/team/maruf.jpg";

const Team = () => {
    const mentors = [
        {
            name: "Shankar Narayan N",
            profile: shankar,
            title: "Project Lead",
            desc: "18+ yrs in Crafting Integrated Marketing Campaigns, 8 Industry Awards, Digital Marcom Leader, worked with Startups, Global Brands and advertising tech businesses, Series B Fund Raising Campaigns '21, 5 X Growth in SME business for SAS Startup '20, RISE tech conference Hong Kong '15, NASSCOM, India startup program, '15 Yahoo Idea Big Chair - Gold '13"
        },
        {
            name: "Md Maruf Hossain",
            profile: maruf,
            title: "Web Application Developer",
            desc: "While frontend development is my primary focus, I also have knowledge across the full stack, including Node.js, Express.js, MongoDB. This well-rounded skill set allows me to collaborate effectively with backend developers and ensure seamless integration of the UI with the backend functionality."
        },
        {
            name: "Ankit Shaw",
            profile: "https://media.licdn.com/dms/image/D5635AQHrUq57Ll3UAA/profile-framedphoto-shrink_400_400/0/1684009091904?e=1701414000&v=beta&t=GRonbAP5Jj4qObdmS5n_R1sXHdbeOMCOZFda4GtOPFo",
            title: "Backend Developer and AI Enthusiast",
            desc: "A B.Tech Final Year student, pursuing Electronics and Communication Engineering from future institute of engineering and management College. 4-Star coder at hackerrank, strong interest in coding and have solved over 200 problems across different platforms. Artificial intelligence experience."
        }
    ];

    return (
        <section className='bg-white text-black p-10 py-16 flex flex-col md:flex-row gap-10 z-50'>
            <div className='w-full md:w-3/12 font-hero'>
                <h1 className='text-xl font-bold mb-1.5'>Meet Our Team</h1>
                <p className='text-sm'>Our Core Team: Meet the minds behind the code.</p>
            </div>
            <div className='w-full md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>
                {
                    mentors?.map(({ name, profile, title, desc }) => (
                        <div className='flex gap-4'>
                            <img className="w-20 h-28 border shadow-md object-cover object-top rounded-full" src={profile} alt="" />
                            <div className='flex-1'>
                                <h4 className='font-semibold'>{name}</h4>
                                <p className='text-sm leading-tight mb-1.5 mt-1'>{title}</p>
                                <p className='text-xs text-gray-600'>{desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Team;