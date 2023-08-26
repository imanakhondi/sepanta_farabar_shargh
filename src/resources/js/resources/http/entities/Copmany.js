import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Company extends Entity {
    constructor() {
        super();
    }

    async getCompany(id) {
        return await this.handlePost(`${BASE_URL}/u/companies/show/${id}`);
    }

    async getAllCompanies(_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/u/companies`, {
            _pn,
            _pi,
        });
    }

    async storeCompany(companyName, mobile) {
        return await this.handlePost(`${BASE_URL}/a/companies/store`, {
            company_name: companyName,
            mobile,
        });
    }

    async updateCompany(id, companyName, mobile) {
        return await this.handlePost(`${BASE_URL}/a/companies/update/${id}`, {
            company_name: companyName,
            mobile,
        });
    }

    async deleteCompany(id) {
        return await this.handlePost(`${BASE_URL}/a/companies/delete/${id}`);
    }
}
