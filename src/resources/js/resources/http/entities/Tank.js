import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Tank extends Entity {
    constructor() {
        super();
    }

    async getTank(id) {
        return await this.handlePost(`${BASE_URL}/u/tanks/show/${id}`);
    }

    async getAllTanks(_pi, _pn) {
        // console.log(_pi, _pn, username, nameFamily, email );
        return await this.handlePost(`${BASE_URL}/u/tanks`, {
            _pn,
            _pi,
        });
    }

    async storeTank(name, family, nationalNo, mobile, tankNo) {
        return await this.handlePost(`${BASE_URL}/a/tanks/store`, {
            name,
            family,
            national_no: nationalNo,
            mobile,
            tank_no: tankNo,
        });
    }

    async updateTank(id, name, family, nationalNo, mobile, tankNo) {
        return await this.handlePost(`${BASE_URL}/a/tanks/update/${id}`, {
            name,
            family,
            national_no: nationalNo,
            mobile,
            tank_no: tankNo,
        });
    }

    async deleteTank(id) {
        return await this.handlePost(`${BASE_URL}/a/tanks/delete/${id}`);
    }
}
