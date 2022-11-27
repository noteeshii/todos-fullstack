export default function (D) {
    const date = new Date(D);
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const y = date.getFullYear();
    return [d,m,y].join('.');
}