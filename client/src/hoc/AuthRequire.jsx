import {Navigate} from "react-router-dom";
import {useContext} from "react";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";

const AuthRequire = ({children}) => {

    const {store} = useContext(Context);

    if (!store.isAuth)
        return <Navigate to="/login" />

    return children;
};

export default observer(AuthRequire);