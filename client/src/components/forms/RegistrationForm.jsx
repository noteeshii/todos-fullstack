import {useContext, useState} from "react";
import BaseInput from "../ui/BaseInput.jsx";
import BaseButton from "../ui/BaseButton.jsx";
import BaseLink from "../ui/BaseLink.jsx";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import useGlobalStore from "../../hooks/useGlobalStore.js";
import {set} from "mobx";

const RegistrationForm = () => {

    const store = useGlobalStore();

    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [thirdName, setThirdName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [chief, setChief] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const registrationHandle = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setMessage('Пароли не совпадают');
            return;
        }
        const formData = {
            first_name: firstName,
            second_name: secondName,
            third_name: thirdName,
            login,
            password,
            chief_id: chief.id ?? null
        };

        await store.registration(formData).then(() => {
            navigate('/');
        }).catch((e) => {
            setMessage(e.response.data.message);
        });
    };

    return (
        <form onSubmit={registrationHandle} className="rounded-lg shadow-2xl w-[500px]">
            <div className="bg-violet-500 rounded-t-lg py-2 text-center text-white">
                Регистраиця
            </div>
            <div className="p-4 bg-white rounded-b-lg grid grid-cols-1 gap-4">
                {message.length > 0 && <div className="bg-red-500 text-white p-2 rounded-lg">{message}</div>}
                <BaseInput label="Имя"
                           required={true} placeholder="Введите имя" value={firstName} onInput={setFirstName} />
                <BaseInput label="Фамилия"
                           required={true} placeholder="Введите фамилию" value={secondName} onInput={setSecondName} />
                <BaseInput label="Отчество"
                           required={true} placeholder="Введите отчество" value={thirdName} onInput={setThirdName} />
                <BaseInput label="Логин"
                           min={4}
                           required={true}
                           placeholder="Введите логин"
                           value={login}
                           onInput={setLogin} />
                <BaseInput
                    label="Пароль"
                    min={4}
                    required={true}
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onInput={setPassword} />
                <BaseInput
                    label="Подтверждение пароля"
                    min={4}
                    required={true}
                    type="password"
                    placeholder="Повторите пароль"
                    value={passwordConfirmation}
                    onInput={setPasswordConfirmation} />

                <BaseLink to="/login">Уже есть учетная запись ?</BaseLink>
                <BaseButton type="submit">Зарегистрироваться</BaseButton>
            </div>
        </form>
    );
};

export default observer(RegistrationForm);