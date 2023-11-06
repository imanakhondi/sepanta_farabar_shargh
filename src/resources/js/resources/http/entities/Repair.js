import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Repair extends Entity {
    constructor() {
        super();
    }

    async getTankRepair(id) {
        return await this.handlePost(`${BASE_URL}/u/repairs/show/${id}`);
    }

    async getAllRepairsTank(id, _pi, _pn) {
        console.log(id, _pi, _pn)
        return await this.handlePost(`${BASE_URL}/u/repairs/${id}`, {
            _pn,
            _pi,
        });
    }

    async storeRepairTank(tankId, repairDate, repairCost, repairDesc) {
        return await this.handlePost(
            `${BASE_URL}/a/repairs/store/${tankId}`,
            {
                repair_date: repairDate,
                cost: repairCost,
                description: repairDesc,
            }
        );
    }

    async updateRepairTank(id, repairDate, cost, description) {
        return await this.handlePost(`${BASE_URL}/a/repairs/update/${id}`, {
            repair_date: repairDate,
            cost,
            description,
        });
    }

    async deleteRepairsTank(id) {
        return await this.handlePost(`${BASE_URL}/a/repairs/delete/${id}`);
    }
}
