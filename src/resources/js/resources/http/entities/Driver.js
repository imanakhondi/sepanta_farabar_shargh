import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Driver extends Entity {
    constructor() {
        super();
    }

    async getDriver(id) {
        return await this.handlePost(`${BASE_URL}/u/drivers/show/${id}`);
    }

    async getAllDrivers(_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/u/drivers`, {
            _pn,
            _pi,
        });
    }

    async storeDriver(
      name,
        family,
        nationalNo,
        mobile,
        licenseNo,
        cardNo
    ) {
        return await this.handlePost(`${BASE_URL}/a/drivers/store`, {
            name,
            family,
            national_no: nationalNo,
            mobile,
            license_no: licenseNo,
            card_no: cardNo,
        });
    }

    async updateDriver(
        id,
        name,
        family,
        nationalNo,
        mobile,
        licenseNo,
        cardNo
    ) {
        return await this.handlePost(`${BASE_URL}/a/drivers/update/${id}`, {
            name,
            family,
            national_no: nationalNo,
            mobile,
            license_no: licenseNo,
            card_no: cardNo,
        });
    }

    async deleteDriver(id) {
        return await this.handlePost(`${BASE_URL}/a/drivers/delete/${id}`);
    }
}
