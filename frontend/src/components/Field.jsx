const Field = ({ label, value, type = "text", placeholder = null, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-md mb-2" htmlFor={label}>
                {label}
            </label>
            <input
                id={label}
                type={type}
                value={value}
                className={"block rounded-md w-full py-2 px-3 border border-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                placeholder={placeholder === null ? '' : placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default Field;

