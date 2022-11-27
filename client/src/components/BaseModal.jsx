
const BaseModal = ({children, onClick}) => {

    const handleClick = event => event.stopPropagation();

    return (
        <div onClick={onClick} className="fixed inset-0 backdrop-blur-sm flex flex-col items-center justify-center">
            <div onClick={handleClick}>
                {children}
            </div>
        </div>
    );
};

export default BaseModal;