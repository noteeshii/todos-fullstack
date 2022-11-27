import {useContext, useState} from "react";
import BaseInput from "../ui/BaseInput.jsx";
import BaseButton from "../ui/BaseButton.jsx";
import BaseLink from "../ui/BaseLink.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../main.jsx";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {

    const {store} = useContext(Context);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const loginHandle = async (e) => {
        e.preventDefault();
        await store.login(login,password).then(() => {
            navigate('/');
        }).catch((e) => {
            setMessage(e.response.data.message);
        });
    };

    return (
        <form onSubmit={loginHandle} className="rounded-lg shadow-2xl w-[500px]">
            <div className="bg-violet-500 rounded-t-lg py-2 text-center text-white">
                Авторизация
            </div>
            <div className="p-4 bg-white rounded-b-lg grid grid-cols-1 gap-4">
                {message.length > 0 && <div className="bg-red-500 text-white rounded-lg px-2 py-1">{message}</div>}
                <BaseInput label="Логин"
                           min={4}
                           required={true}
                           placeholder="Введите логин"
                           value={login}
                           onInput={setLogin} />
                <BaseInput
                    label="Пароль"
                    min={4}
                    type="password"
                    required={true}
                    placeholder="Введите пароль"
                    value={password}
                    onInput={setPassword} />

                <BaseLink to="/registration">Ещё нет учтеной записи ?</BaseLink>
                <BaseButton type="submit">Войти</BaseButton>
            </div>
        </form>
    );
};

export default observer(LoginForm);