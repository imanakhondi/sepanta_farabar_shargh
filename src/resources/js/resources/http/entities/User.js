import { BASE_URL } from "../../constants";
import utils from "../../utils/Utils";
import Entity from "./Entity";

export class User extends Entity {
    constructor() {
        super();
    }

    async getUser(id) {
        return await this.handlePost(`${BASE_URL}/a/users/show/${id}`);
    }

    async fetchUser() {
        return await this.handlePost(`${BASE_URL}/u/users/auth`);
    }

    async getAllUsers(_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/a/users`, {
            _pn,
            _pi,
        });
    }

    async loginUser(username, password) {
        const result = await this.handlePost(`${BASE_URL}/u/users/login`, {
            username,
            password,
        });
        return result;
    }

    async storeUser(
        username,
        name,
        family,
        nationalNo,
        mobile,
        email,
        password,
        confirmPassword,
        isActive
    ) {
        return await this.handlePost(`${BASE_URL}/a/users/store`, {
            username,
            name,
            family,
            national_no: nationalNo,
            mobile,
            email,
            password,
            password_confirmation: confirmPassword,
            is_active: isActive,
        });
    }

    async updateUser(id, name, family, nationalNo, mobile, email) {
        return await this.handlePost(`${BASE_URL}/a/users/update/${id}`, {
            name,
            family,
            nationalNo: nationalNo,
            mobile,
            email,
        });
    }

    async deleteUser(id) {
        return await this.handlePost(`${BASE_URL}/a/users/delete/${id}`);
    }

    async forgotPassword(email) {
        return await this.handlePost(`${BASE_URL}/u/users/forgot_password`, {
            email,
        });
    }

    async changePassword(id, newPassword, confirmPassword) {
        return await this.handlePost(
            `${BASE_URL}/a/users/change_password/${id}`,
            {
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            }
        );
    }

    async changePasswordFromUser(newPassword, confirmPassword) {
        return await this.handlePost(`${BASE_URL}/u/users/change_password`, {
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
        });
    }

    logOut() {
        utils.clearLS();
    }
}
