import {useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import useGlobalStore from "../../hooks/useGlobalStore.js";

const BaseUserSelect = ({value, onSelect, label, placeholder, required = false}) => {

    const [isOpen, setIsOpen] = useState(false);
    const store = useGlobalStore();

    const open = () => {
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
    };

    const selectHandle = (item) => {
        close();
        onSelect(item);
    }

    const fullName = id => {
        const user = store.usersMap?.get(id);
        return ([user?.second_name, user?.first_name].join(' ')) || false;
    }

    const classes = useMemo(() => {
        if (value?.id)
            return 'text-violet-600 px-2'
        return 'text-violet-300 px-2'
    }, [value])

    return (
        <label onClick={open} onMouseLeave={close}>
            <span className="ml-2 text-violet-600">{label}{required && <span className="text-red-500 text-md">*</span>}</span>
            <div className="relative ring-1 ring-violet-600 rounded-lg py-1 cursor-pointer">
                <span className={classes}>{value?.id ? fullName(value.id) : placeholder}</span>
                {isOpen &&
                    <div className="absolute bg-white z-40 shadow-2xl rounded-b-lg text-violet-600 w-full ring-1 ring-violet-600">
                        {store.users.map(item => <div className="hover:bg-black/10 p-2" key={item.id} onClick={() => selectHandle(item)}>{fullName(item.id)}</div>)}
                    </div>}
            </div>
        </label>

    );
};

export default observer(BaseUserSelect);