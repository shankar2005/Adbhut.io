import { useGenerateTextMutation } from "../../features/generative/generativeApi";

const GenerateText = () => {
    const [generateText, { data, isLoading, isSuccess }] = useGenerateTextMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        generateText({
            product_title: e.target.product_title.value
        });
    }

    return (
        <>
            {/* <div className="grid grid-cols-12">
                <aside className='col-span-4 sticky top-0 h-screen bg-gray-100'>
                    <div className='grid grid-cols-2 gap-x-3 gap-y-5 px-6 py-3 border-r'>
                        <div>
                            <label for="language" class="block mb-1 text-sm text-gray-900">Select language</label>
                            <select id="language" class="border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value="en" selected>
                                    English
                                </option>
                            </select>
                        </div>
                        <div>
                            <label for="tone" class="block mb-1 text-sm text-gray-900">Select tone</label>
                            <select id="tone" class="border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Choose a tone</option>
                                <option value="CA">Convincing</option>
                                <option value="FR">Formal</option>
                                <option value="DE">Casual</option>
                            </select>
                        </div>
                        <div className='col-span-full'>
                            <label for="usecase" class="block mb-1 text-sm text-gray-900">Select use case</label>
                            <select id="usecase" class="border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected>Product Description Writing</option>
                            </select>
                            <small className='block text-xs mt-2 text-gray-500'>Generate product description based on section topics & headlines</small>
                        </div>
                        <div className='col-span-full'>
                            <label for="topic" class="block mb-1 text-sm text-gray-900">Enter topics</label>
                            <textarea id="topic" class="border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2" rows="2" placeholder='Enter your topics'></textarea>
                            <div className='flex justify-between mt-2 text-gray-500'>
                                <small className='text-xs'>For best results provide maximum input</small>
                                <small>0/300</small>
                            </div>
                        </div>
                        <div className='col-span-full'>
                            <label for="keywords" class="block mb-1 text-sm text-gray-900">Enter keywords</label>
                            <textarea id="keywords" class="border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2" rows="2" placeholder='Enter your keywords'></textarea>
                            <div className='flex justify-between mt-2 text-gray-500'>
                                <small className='text-xs'>For best results provide maximum input (optional)</small>
                                <small>0/250</small>
                            </div>
                        </div>
                        <div className='col-span-full'>
                            <button className='bg-blue-500 w-full font-medium text-sm py-2 rounded-full text-white'>Generate</button>
                        </div>
                    </div>
                </aside>
                <main className='col-span-8'>
                    <h6 className='font-meidum px-5 py-3 font-medium border-b'>Lorem ipsum dolor sit amet.</h6>
                    <div className='py-5 px-20 font-sans whitespace-pre-line'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aliquam nobis quas laborum harum nesciunt praesentium saepe qui nostrum, facilis provident fugiat, incidunt architecto magnam quos labore. Sapiente, ut. Magni repellat atque iure voluptatibus, assumenda dolor obcaecati. Perferendis, quis numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aliquam nobis quas laborum harum nesciunt praesentium saepe qui nostrum, facilis provident fugiat, incidunt architecto magnam quos labore. Sapiente, ut. Magni repellat atque iure voluptatibus, assumenda dolor obcaecati. Perferendis, quis numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aliquam nobis quas laborum harum nesciunt praesentium saepe qui nostrum, facilis provident fugiat, incidunt architecto magnam quos labore. Sapiente, ut. Magni repellat atque iure voluptatibus, assumenda dolor obcaecati. Perferendis, quis numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aliquam nobis quas laborum harum nesciunt praesentium saepe qui nostrum, facilis provident fugiat, incidunt architecto magnam quos labore. Sapiente, ut. Magni repellat atque iure voluptatibus, assumenda dolor obcaecati. Perferendis, quis numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aliquam nobis quas laborum harum nesciunt praesentium saepe qui nostrum, facilis provident fugiat, incidunt architecto magnam quos labore. Sapiente, ut. Magni repellat atque iure voluptatibus, assumenda dolor obcaecati. Perferendis, quis numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, aliquam nobis quas laborum harum nesciunt praesentium saepe qui nostrum, facilis provident fugiat, incidunt architecto magnam quos labore. Sapiente, ut. Magni repellat atque iure voluptatibus, assumenda dolor obcaecati. Perferendis, quis numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, cum? <br />
                    </div>
                </main>
            </div> */}

            <main className="max-w-screen-md mx-auto pb-10">
                <div className="text-center py-10">
                    <h1 className="text-4xl font-bold mb-3">Generate Product Description</h1>
                    <small className="text-sm">Use our product description generator feature to effortlessly create text from your uploaded images. <br /> Generate accurate descriptions with just a single click!</small>
                </div>
                <form onSubmit={handleSubmit} className="p-3 shadow-2xl flex gap-2 rounded">
                    <input name="product_title" disabled={isLoading} className="border border-sky-900/40 rounded w-full p-2 text-center" type="text" placeholder="Enter your product title ..." />
                    {isLoading
                        ? <button disabled type="button" className='bg-gray-300 px-5 font-medium text-sm py-2 rounded text-white cursor-wait'>Generate</button>
                        : <button type="submit" className='bg-blue-500 px-5 font-medium text-sm py-2 rounded text-white'>Generate</button>}
                </form>
                <div className="mt-20 bg-gray-50 p-5 border rounded">
                    {isLoading
                        ? (
                            <div className="flex items-center justify-center h-[9rem] gap-2">
                                <span className="animate-pulse text-gray-600">Generating ... </span>
                                <div className="w-10 h-10 border-8 border-gray-500 rounded-full border-dashed animate-spin"></div>
                            </div>
                        ) : (
                            isSuccess &&
                            <>
                                <h5 className="bg-gray-200 px-4 py-2 rounded font-semibold mb-2">Description:</h5>
                                <p className="font-sans select-all">{data?.product_description}</p>
                                <h5 className="bg-gray-200 px-4 py-2 rounded font-semibold mb-4 mt-8">Keywords:</h5>
                                <div className="flex flex-col flex-wrap gap-y-2 gap-x-1">{data?.product_keywords?.map(keyword => <span className="px-3 py-1 bg-white border text-sm rounded-full shadow-sm w-fit select-all">{keyword}</span>)}</div>
                            </>
                        )}
                </div>
            </main>
        </>
    );
};

export default GenerateText;