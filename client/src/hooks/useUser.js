import useGlobalStore from "./useGlobalStore.js";

export default function (id) {
    const store = useGlobalStore();
    return store.usersMap.get(id);
}