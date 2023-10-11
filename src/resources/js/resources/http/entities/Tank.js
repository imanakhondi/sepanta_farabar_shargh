import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Tank extends Entity {
    constructor() {
        super();
    }

    async getTank(id) {
        return await this.handlePost(`${BASE_URL}/u/tanks/show/${id}`);
    }

    async getAllTanks(tankId,_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/u/tanks/${tankId}`, {
            _pn,
            _pi,
        });
    }

    async storeTank(companyId,tankNo, psiDate, testValidityDate, capotageDate) {
        return await this.handlePost(`${BASE_URL}/a/tanks/store/${companyId}`, {
            tank_no: tankNo,
            psi_date: psiDate,
            test_validity_date: testValidityDate,
            capotage_date: capotageDate,
        });
    }

    async updateTank(id, tankNo, psiDate, testValidityDate, capotageDate) {
        return await this.handlePost(`${BASE_URL}/a/tanks/update/${id}`, {
            tank_no: tankNo,
            psi_date: psiDate,
            test_validity_date: testValidityDate,
            capotage_date: capotageDate,
        });
    }

      async deleteTank(id) {
        return await this.handlePost(`${BASE_URL}/a/tanks/delete/${id}`);
    }
}
