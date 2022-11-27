import useUser from "../hooks/useUser.js";
import useFullUserName from "../hooks/useFullUserName.js";
import BaseButton from "./ui/BaseButton.jsx";
import useGlobalStore from "../hooks/useGlobalStore.js";
import useDateFormat from "../hooks/useDateFormat.js";

const FullViewTask = ({task, onCancel}) => {

    const store = useGlobalStore();

    const responsible = useUser(task.responsible_id);
    const owner = useUser(task.owner_id);

    const beginDoTask = async () => {
        const data = {
            id: task.id,
            status: "Выполняется"
        }
        await store.updateTaskStatus(data).then(() => onCancel());
    }

    const endDoTask = async () => {
        const data = {
            id: task.id,
            status: "Выполнена"
        }
        await store.updateTaskStatus(data).then(() => onCancel());
    }

    const cancelTask = async () => {
        const data = {
            id: task.id,
            status: "Отменена"
        }
        await store.updateTaskStatus(data).then(() => onCancel());
    }

    return (
        <div className="rounded-lg shadow-2xl w-[500px]">
            <div className="bg-violet-500 rounded-t-lg py-2 text-center text-white">
                {task.title}
            </div>
            <div className="p-4 bg-white rounded-b-lg grid grid-cols-1 gap-4 grid grid-cols-2">
                <div className="col-span-2">
                    <span className="ml-2 text-slate-600">Дата окончания: </span>
                    <span className="p-2 bg-white shadow rounded-lg text-slate-600 text-sm">
                        {useDateFormat(task.end_at)}
                    </span>
                </div>
                <div>
                    <span className="ml-2 text-slate-600">Приоритет: </span>
                    <span className="p-2 bg-white shadow rounded-lg text-slate-600 text-sm">
                        {task.priority}
                    </span>
                </div>
                <div>
                    <span className="ml-2 text-slate-600">Статус: </span>
                    <span className="p-2 shadow rounded-lg text-sm bg-white text-slate-600">
                        {task.status}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="ml-2 text-slate-600">Постановщик: </span>
                    <span className="p-2 bg-white shadow rounded-lg text-slate-600 text-sm">
                        {useFullUserName(owner)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="ml-2 text-slate-600">Ответственный: </span>
                    <span className="p-2 bg-white shadow rounded-lg text-slate-600 text-sm">
                        {useFullUserName(responsible)}
                    </span>
                </div>
                {task.description.length > 0 &&
                <div className="col-span-2">
                    <span className="ml-2 text-slate-600">Описание: </span>
                    <p className="p-2 bg-white shadow rounded-lg text-slate-600 text-sm">
                        {task.description}
                    </p>
                </div>}
                <div className="col-span-2 flex justify-between">
                    {task.status === 'К выполнению' && <BaseButton onClick={beginDoTask}>Начать выполнение</BaseButton>}
                    {task.status === 'Выполняется' && <BaseButton onClick={endDoTask}>Завершить задачу</BaseButton>}
                    {store.user.id === owner.id && <BaseButton onClick={cancelTask}>Отменить задачу</BaseButton>}
                </div>
            </div>
        </div>
    );
};

export default FullViewTask;