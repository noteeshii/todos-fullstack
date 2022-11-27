import {useContext} from "react";
import {Context} from "../main.jsx";

export default function () {
    return useContext(Context).store;
}