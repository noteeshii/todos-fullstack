export default function (user) {
    return [user?.second_name, user?.first_name].join(' ');
}