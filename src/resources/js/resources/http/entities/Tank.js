import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Tank extends Entity {
    constructor() {
        super();
    }

    async getTank(id) {
        return await this.handlePost(`${BASE_URL}/a/tanks/show/${id}`);
    }

    async getAllTanks() {
        return await this.handlePost(`${BASE_URL}/u/tanks`);
    }

    async storeTank(name, family, nationalCode, mobile, tankNum) {
        return await this.handlePost(`${BASE_URL}/a/tanks/store`, {
            name,
            family,
            national_no: nationalCode,
            mobile,
            tank_no: tankNum,
        });
    }

    async deleteTank(id) {
        return await this.handlePost(`${BASE_URL}/a/tanks/delete/${id}`);
    }
}
