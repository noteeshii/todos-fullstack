import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import RegistrationView from "./views/RegistrationView.jsx";
import LoginView from "./views/LoginView.jsx";
import TasksView from "./views/TasksView.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import {observer} from "mobx-react-lite";
import AuthRequire from "./hoc/AuthRequire.jsx";
import useGlobalStore from "./hooks/useGlobalStore.js";

const App = () => {

    const store = useGlobalStore();
    const navigate = useNavigate();

    useEffect( () => {
        if (localStorage.getItem('accessToken'))
            (async function () {
                await store.checkAuth().then(() => navigate('/'));
            })();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={
                    <AuthRequire>
                        <TasksView/>
                    </AuthRequire>
                }/>
                <Route path="/registration" element={<RegistrationView/>}/>
                <Route path="/login" element={<LoginView/>}/>
            </Route>
        </Routes>
    )
}

export default observer(App);
