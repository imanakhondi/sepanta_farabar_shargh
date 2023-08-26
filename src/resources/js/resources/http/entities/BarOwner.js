import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class BarOwner extends Entity {
    constructor() {
        super();
    }

    async getBarOwner(id) {
        return await this.handlePost(`${BASE_URL}/u/barOwners/show/${id}`);
    }

    async getAllBarOwners(_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/u/barOwners`, {
            _pn,
            _pi,
        });
    }

    async storeBarOwner(companyName, name, family, mobile) {
        return await this.handlePost(`${BASE_URL}/a/barOwners/store`, {
            company_name:companyName,
            name,
            family,
            mobile,
        });
    }

    async updateBarOwner(id, companyName, name, family, mobile) {
        return await this.handlePost(`${BASE_URL}/a/barOwners/update/${id}`, {
            company_name:companyName,
            name,
            family,
            mobile,
        });
    }

    async deleteBarOwner(id) {
        return await this.handlePost(`${BASE_URL}/a/barOwners/delete/${id}`);
    }
}
