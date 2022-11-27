
const BaseButton = ({onClick, children, type = "button"}) => {
    return (
        <button onClick={onClick} type={type} className="rounded-lg px-2 py-1 border border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white active:bg-violet-800 ">
            {children}
        </button>
    );
};

export default BaseButton;