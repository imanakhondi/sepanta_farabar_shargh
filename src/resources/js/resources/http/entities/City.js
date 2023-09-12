import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class City extends Entity {
    constructor() {
        super();
    }

    async getCity(id) {
        return await this.handlePost(`${BASE_URL}/u/cities/show/${id}`);
    }

    async getAllCities(_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/u/cities`, {
            _pn,
            _pi,
        });
    }

    async storeCity(cityName) {
        return await this.handlePost(`${BASE_URL}/a/cities/store`, {
            name:cityName,
        });
    }

    async updateCity(id, cityName) {
        return await this.handlePost(`${BASE_URL}/a/cities/update/${id}`, {
            name:cityName,
        });
    }

    async deleteCity(id) {
        return await this.handlePost(`${BASE_URL}/a/cities/delete/${id}`);
    }
}
