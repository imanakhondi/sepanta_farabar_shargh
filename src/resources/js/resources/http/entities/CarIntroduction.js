import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class CarIntroduction extends Entity {
    constructor() {
        super();
    }

    async getCarIntroduction(id) {
        return await this.handlePost(
            `${BASE_URL}/u/carintroduction/show/${id}`
        );
    }

    async getCarsIntroduction(_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/u/carintroduction`, {
            _pn,
            _pi,
        });
    }

    async storeCarIntroduction(driverInfo, carInfo, tankInfo) {
        return await this.handlePost(`${BASE_URL}/a/carintroduction/store`, {
            driver_info: driverInfo,
            car_info: carInfo,
            tank_info: tankInfo,
        });
    }

    async updateCarIntroduction(id, driverInfo, carInfo, tankInfo) {
        return await this.handlePost(
            `${BASE_URL}/a/carintroduction/update/${id}`,
            {
                driver_info: driverInfo,
                car_info: carInfo,
                tank_info: tankInfo,
            }
        );
    }

    async deleteCarIntroduction(id) {
        return await this.handlePost(
            `${BASE_URL}/a/carintroduction/delete/${id}`
        );
    }
}
