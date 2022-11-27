import BaseInput from "../ui/BaseInput.jsx";
import BaseButton from "../ui/BaseButton.jsx";
import {useState} from "react";
import BaseSelect from "../ui/BaseSelect.jsx";
import BaseTextArea from "../ui/BaseTextArea.jsx";
import BaseUserSelect from "../ui/BaseUserSelect.jsx";
import useGlobalStore from "../../hooks/useGlobalStore.js";
import {observer} from "mobx-react-lite";

const CreateTaskForm = ({onCancel}) => {
    const store = useGlobalStore();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority ] = useState('');
    const [responsible, setResponsible] = useState({});
    const [end_at, setEnd_at] = useState('');

    const submitHandle = async (e) => {
        e.preventDefault();
        const dateNow = new Date();
        const newTask = {
            title,
            description,
            priority,
            status: 'К выполнению',
            owner_id: store.user.id,
            responsible_id: responsible.id,
            created_at: dateNow,
            updated_at: dateNow,
            end_at,
        };
        await store.createNewTask(newTask);
        onCancel();
    }


    return (
        <form onSubmit={submitHandle} className="rounded-lg shadow-2xl w-[500px]">
            <div className="bg-violet-500 rounded-t-lg py-2 text-center text-white">
                Создать задачу
            </div>
            <div className="p-4 bg-white rounded-b-lg grid grid-cols-1 gap-4">
                <BaseInput label="Заголовок"
                           required={true}
                           value={title}
                           onInput={setTitle}
                           placeholder="Введите заголовок"/>
                <BaseTextArea value={description} onInput={setDescription} placeholder="Введите описание задачи" label="Описание"/>
                <BaseInput label="Дата окончания"
                           required={true}
                           type="date"
                           value={end_at}
                           onInput={setEnd_at}
                           placeholder="Выберите дату окончания"/>
                <BaseSelect value={priority} required={true} placeholder="Выберите приоритет" label="Приоритет" items={['Высокий', 'Низкий', 'Средний']} onSelect={setPriority}/>
                <BaseUserSelect value={responsible} onSelect={setResponsible} required={true} placeholder="Выберите пользователя" label="Ответственный"/>
                <BaseButton type="submit">Создать</BaseButton>
                <BaseButton onClick={onCancel}>Отмена</BaseButton>
            </div>
        </form>
    );
};

export default observer(CreateTaskForm);