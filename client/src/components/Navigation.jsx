import BaseLink from "./ui/BaseLink.jsx";
import {observer} from "mobx-react-lite";
import useGlobalStore from "../hooks/useGlobalStore.js";
import {useNavigate} from "react-router-dom";

const Navigation = () => {

    const store = useGlobalStore();
    const navigate = useNavigate();
    const logout = async () => {
        await store.logout()
            .then(() => navigate('/login'))
            .catch(e => console.log(e.response?.data?.message));
    }

    if (store.isAuth)
        return (
            <nav className="flex gap-10">
                <BaseLink to="/">Задачи</BaseLink>
                <button onClick={logout} className=" outline-none text-violet-500 px-2 py-1 rounded-lg hover:underline hover:underline-offset-4 max-w-fit">Выйти</button>
            </nav>
        );
    else
        return (
            <nav className="flex gap-10">
                <BaseLink to="/login">Авторизация</BaseLink>
                <BaseLink to="/registration">Регистрация</BaseLink>
            </nav>
        );
};

export default observer(Navigation);