import {useMemo} from "react";
import useDateFormat from "../hooks/useDateFormat.js";
import useUser from "../hooks/useUser.js";
import useFullUserName from "../hooks/useFullUserName.js";

const SingleTask = ({task, onClick}) => {

    const responsible = useUser(task.responsible_id);

    const [taskOverdue, isTaskCompleted] = useMemo(() => {
        return [
            new Date().getTime() > new Date(task.end_at).getTime(),
            task.status === 'Выполнена'
        ]
    },[task.end_at, task.status]);

    return (
        <div onClick={() => onClick(task)} className="grid grid-cols-5 justify-items-center hover:bg-black/10 rounded-lg py-4 cursor-pointer text-slate-500">
            <span className={taskOverdue ? 'text-red-400' : isTaskCompleted ? 'text-emerald-600' : ''}>
                {task.title}
            </span>
            <span>
                {task.priority}
            </span>
            <span>
                {task.status}
            </span>
            <span>
                {useFullUserName(responsible)}
            </span>
            <span>
                {useDateFormat(task.end_at)}
            </span>
        </div>
    );
};

export default SingleTask;