const Container = ({ children }) => {
    return (
        <section className='w-9/12 mx-auto bg-white rounded-b-lg shadow-lg'>
            {children}
        </section>
    );
};

export default Container;