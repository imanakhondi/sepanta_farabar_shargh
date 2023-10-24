import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Introduction extends Entity {
    constructor() {
        super();
    }

    async getAllIntroductionProps() {
        return await this.handlePost(`${BASE_URL}/u/introductions/props`);
    }

    async getIntroduction(id) {
        return await this.handlePost(`${BASE_URL}/u/introductions/show/${id}`);
    }

    async getAllIntroductions(_pi, _pn) {
        return await this.handlePost(`${BASE_URL}/u/introductions`, {
            _pn,
            _pi,
        });
    }

    async storeIntroduction(
        barOwnerId,
        startPointId,
        endPointId,
        introductionNo,
        introductionDate,
        barOwner,
        startPoint,
        endPoint,
        ownerUnitUSD,
        ownerUnitIRR
    ) {
        return await this.handlePost(
            `${BASE_URL}/a/introductions/store/${barOwnerId}/${startPointId}/${endPointId}`,
            {
                introduction_no: introductionNo,
                introduction_date: introductionDate,
                bar_owner: barOwner,
                start_point: startPoint,
                end_point: endPoint,
                owner_unit_usd: ownerUnitUSD,
                owner_unit_irr: ownerUnitIRR,
            }
        );
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
