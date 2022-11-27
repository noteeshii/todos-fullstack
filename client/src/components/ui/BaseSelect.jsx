import {useMemo, useState} from "react";

const BaseSelect = ({items, value, onSelect, label, placeholder, required = false}) => {

    const [isOpen, setIsOpen] = useState(false);

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

    const classes = useMemo(() => {
        if (value.length > 0)
            return 'text-violet-600 px-2'
        return 'text-violet-300 px-2'
    }, [value])

    return (
        <label onClick={open} onMouseLeave={close}>
            <span className="ml-2 text-violet-600">{label}{required && <span className="text-red-500 text-md">*</span>}</span>
            <div className="relative ring-1 ring-violet-600 rounded-lg py-1 cursor-pointer">
                <span className={classes}>{value || placeholder}</span>
                {isOpen &&
                    <div className="absolute z-40 bg-white shadow-2xl rounded-b-lg text-violet-600 w-full ring-1 ring-violet-600">
                        {items.map(item => <div className="hover:bg-black/10 p-2" key={item} onClick={() => selectHandle(item)}>{item}</div>)}
                    </div>}
            </div>
        </label>

    );
};

export default BaseSelect;