module.exports = class UserDto {
    id;
    first_name;
    second_name;
    third_name;
    chief_id;

    constructor(user) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.second_name = user.second_name;
        this.third_name = user.third_name;
        this.chief_id = user.chief_id;
    }

}