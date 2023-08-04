import Entity from "./Entity";
import { BASE_URL } from "../../constants";

export class Car extends Entity {
    constructor() {
        super();
    }

    async getCar(id) {
        return await this.handlePost(`${BASE_URL}/u/trucks/show/${id}`);
    }

    async getAllCars(_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/u/trucks`, {
            _pn,
            _pi,
        });
    }

    async storeCar(
        name,
        family,
        nationalCode,
        mobile,
        carLicensePlateNum,
        carTransitLicensePlateNum
    ) {
        return await this.handlePost(`${BASE_URL}/a/trucks/store`, {
            name,
            family,
            national_no: nationalCode,
            mobile,
            ir_no: carLicensePlateNum,
            transit_no: carTransitLicensePlateNum,
        });
    }

    async updateCar(
        id,
        name,
        family,
        nationalCode,
        mobile,
        carLicensePlateNum,
        carTransitLicensePlateNum
    ) {
        return await this.handlePost(`${BASE_URL}/a/trucks/update/${id}`, {
            name,
            family,
            national_no: nationalCode,
            mobile,
            ir_no: carLicensePlateNum,
            transit_no: carTransitLicensePlateNum,
        });
    }

    async deleteCar(id) {
        return await this.handlePost(`${BASE_URL}/a/trucks/delete/${id}`);
    }
}
