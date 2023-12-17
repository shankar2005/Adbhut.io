import { Link } from 'react-router-dom';

const APIs = () => {
    return (
        <section id="api" className='bg-gray-100 py-10 lg:py-20'>
            <div className='w-11/12 lg:w-9/12 mx-auto'>
                <h1 className='text-3xl lg:text-5xl text-center font-semibold mb-5 lg:mb-10'>Use cases for our APIs</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className='bg-white p-5 rounded-xl shadow-lg'>
                        <h4 className='text-2xl font-semibold mb-3'>Automated Content Generation</h4>
                        <ul className='list-disc ml-5 text-gray-600'>
                            <li>Use natural language processing (NLP) to generate content for product descriptions, blogs, or FAQs.</li>
                            <li>Improve SEO by regularly updating and optimizing content.</li>
                        </ul>
                        <Link to="/api/generate-text">
                            <button className='mt-4 font-hero bg-sky-900 py-2 px-5 rounded font-semibold text-white'>Try it</button>
                        </Link>
                    </div>
                    <div className='bg-white p-5 rounded-xl shadow-lg'>
                        <h4 className='text-2xl font-semibold mb-3'>Customer Support Automation</h4>
                        <ul className='list-disc ml-5 text-gray-600'>
                            <li>Implement chatbots powered by AI to handle customer inquiries and support.</li>
                            <li>Provide instant assistance and gather data for further improvements.</li>
                        </ul>
                    </div>
                    <div className='bg-white p-5 rounded-xl shadow-lg'>
                        <h4 className='text-2xl font-semibold mb-3'>Image Recognition</h4>
                        <ul className='list-disc ml-5 text-gray-600'>
                            <li>Enable image recognition to enhance search functionality and improve product tagging for SEO.</li>
                        </ul>
                        <Link to="/api/extract-text">
                            <button className='mt-4 font-hero bg-sky-900 py-2 px-5 rounded font-semibold text-white'>Try it</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default APIs;