import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import SingleTask from "../components/SingleTask.jsx";
import BaseButton from "../components/ui/BaseButton.jsx";
import BaseModal from "../components/BaseModal.jsx";
import CreateTaskForm from "../components/forms/CreateTaskForm.jsx";
import useGlobalStore from "../hooks/useGlobalStore.js";
import FullViewTask from "../components/FullViewTask.jsx";

const TasksView = () => {

    const store = useGlobalStore();
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [isFullViewTaskOpen, setIsFullViewTaskOpen] = useState(false);
    const [openTask, setOpenTask] = useState({});
    const closeForm = () => {
        setIsCreateFormOpen(false);
    }
    const openForm = () => {
        setIsCreateFormOpen(true);
    }

    const closeFullView = () => {
        setIsFullViewTaskOpen(false);
        setOpenTask({});
    }
    const openFullView = (task) => {
        setOpenTask(task);
        setIsFullViewTaskOpen(true);
    }


    useEffect(() => {
        (async function () {
            await store.fetchAllUsers();
            await store.fetchAllTasks();
        })()
    }, []);

    return (
        <>
            {isCreateFormOpen &&
                <BaseModal onClick={closeForm}>
                    <CreateTaskForm onCancel={closeForm}/>
                </BaseModal>}
            {isFullViewTaskOpen &&
                <BaseModal onClick={closeFullView}>
                    <FullViewTask task={openTask} onCancel={closeFullView}/>
                </BaseModal>}
            <div className="mb-2">
                <BaseButton onClick={openForm}>Создать задачу</BaseButton>
            </div>
            <div className="rounded-lg">
                <div className="rounded-t-lg bg-violet-600 p-2 grid grid-cols-5 justify-items-center text-white">
                <span>
                    Заголовок
                </span>
                    <span>
                    Приоритет
                </span>
                    <span>
                    Статус
                </span>
                    <span>
                    Ответственный
                </span>
                    <span>
                    Дата окончания
                </span>
                </div>
                <div className="bg-white shadow-2xl p-5 rounded-b-lg">
                    {store.tasks.map(task => <SingleTask onClick={openFullView} key={task.id} task={task}/>)}
                </div>
            </div>
        </>
    );
};

export default observer(TasksView);