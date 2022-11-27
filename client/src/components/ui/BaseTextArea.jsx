const BaseTextArea = ({label, placeholder, onInput, value}) => {

    const inputHandle = e => onInput(e.target.value);

    return (
        <label className="flex flex-col">
            <span className="ml-2 text-violet-600">{label}</span>
            <textarea value={value}
                      placeholder={placeholder}
                      onChange={inputHandle}
                      className="outline-none px-2 py-1 rounded-lg ring-violet-600 text-violet-600 placeholder:text-violet-300 ring-1 focus:ring-2"
            ></textarea>
        </label>
    );
};

export default BaseTextArea;