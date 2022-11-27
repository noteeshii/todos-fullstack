import {Link} from "react-router-dom";

const BaseLink = ({to, children}) => {
    return (
        <Link to={to} className="text-violet-500 px-2 py-1 rounded-lg hover:underline hover:underline-offset-4 max-w-fit">
            {children}
        </Link>
    );
};

export default BaseLink;