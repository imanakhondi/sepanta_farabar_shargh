import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Introduction extends Entity {
    constructor() {
        super();
    }

    async getIntroduction(id) {
        return await this.handlePost(`${BASE_URL}/u/introduction/show/${id}`);
    }

    async getAllIntroductions(_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/u/introduction`, {
            _pn,
            _pi,
        });
    }

    async storeIntroduction(
        introductionNo,
        introductionDate,
        barOwner,
        carrier,
        startPoint,
        endPoint,
        ownerUnitUSD,
        ownerUnitIRR
    ) {
        return await this.handlePost(`${BASE_URL}/a/introduction/store`, {
            introduction_no: introductionNo,
            introduction_date: introductionDate,
            bar_owner: barOwner,
            carrier,
            start_point: startPoint,
            end_point: endPoint,
            owner_unit_usd: ownerUnitUSD,
            owner_unit_irr: ownerUnitIRR,
        });
    }

    async updateIntroduction(
        id,
        introductionNo,
        introductionDate,
        barOwner,
        carrier,
        startPoint,
        endPoint,
        ownerUnitUSD,
        ownerUnitIRR
    ) {
        return await this.handlePost(
            `${BASE_URL}/a/introduction/update/${id}`,
            {
                introduction_no: introductionNo,
                introduction_date: introductionDate,
                bar_owner: barOwner,
                carrier,
                start_point: startPoint,
                end_point: endPoint,
                owner_unit_usd: ownerUnitUSD,
                owner_unit_irr: ownerUnitIRR,
            }
        );
    }

    async deleteIntroduction(id) {
        return await this.handlePost(`${BASE_URL}/a/introduction/delete/${id}`);
    }

}
