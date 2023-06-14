const Container = ({ children, className }) => {
    return (
        <section className={`w-9/12 mx-auto mb-5 bg-white rounded-b-lg shadow-lg ${className || ""}`}>
            {children}
        </section>
    );
};

export default Container;