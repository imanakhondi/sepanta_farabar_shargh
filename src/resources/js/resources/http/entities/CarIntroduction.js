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

    async storeCarIntroductionFirstStep(driverInfo, carInfo, tankInfo) {
        return await this.handlePost(`${BASE_URL}/a/carintroduction/store`, {
            driver_info: driverInfo,
            car_info: carInfo,
            tank_info: tankInfo,
        });
    }

    async updateCarIntroductionFirstStep(id, driverInfo, carInfo, tankInfo) {
        return await this.handlePost(
            `${BASE_URL}/a/carintroduction/update/${id}`,
            {
                driver_info: driverInfo,
                car_info: carInfo,
                tank_info: tankInfo,
            }
        );
    }

    async storeCarIntroductionSecondStep(
        registryDate,
        remittanceName,
        loadingDate,
        loadingTonnage,
        carrierUnitUSD,
        carrierTotalUSD,
        carrierUnitIRR,
        carrierTotalIRR,
        ownerTotalUSD,
        ownerTotalIRR,
        carrierLoadingCommission,
        forwardingLoadingCommission
    ) {
        return await this.handlePost(`${BASE_URL}/a/carintroduction/store`, {
            registry_date: registryDate,
            remittance_name: remittanceName,
            loading_date: loadingDate,
            loading_tonnage: loadingTonnage,
            carrier_unit_usd: carrierUnitUSD,
            carrier_total_usd: carrierTotalUSD,
            carrier_unit_irr: carrierUnitIRR,
            carrier_total_irr: carrierTotalIRR,
            owner_total_usd: ownerTotalUSD,
            owner_total_irr: ownerTotalIRR,
            carrier_loading_commission: carrierLoadingCommission,
            forwarding_loading_commission: forwardingLoadingCommission,
        });
    }

    async updateCarIntroductionSecondStep(
        id,
        registryDate,
        remittanceName,
        loadingDate,
        loadingTonnage,
        carrierUnitUSD,
        carrierTotalUSD,
        carrierUnitIRR,
        carrierTotalIRR,
        ownerTotalUSD,
        ownerTotalIRR,
        carrierLoadingCommission,
        forwardingLoadingCommission
    ) {
        return await this.handlePost(
            `${BASE_URL}/a/carintroduction/update/${id}`,
            {
                registry_date: registryDate,
                remittance_name: remittanceName,
                loading_date: loadingDate,
                loading_tonnage: loadingTonnage,
                carrier_unit_usd: carrierUnitUSD,
                carrier_total_usd: carrierTotalUSD,
                carrier_unit_irr: carrierUnitIRR,
                carrier_total_irr: carrierTotalIRR,
                owner_total_usd: ownerTotalUSD,
                owner_total_irr: ownerTotalIRR,
                carrier_loading_commission: carrierLoadingCommission,
                forwarding_loading_commission: forwardingLoadingCommission,
            }
        );
    }

    async storeCarIntroductionThirdStep(
        unloadingDate,
        unloadingTonnage,
        difference,
        allowableDeficit,
        deficitOrSurplus,
        unloadingReceipt
    ) {
        return await this.handlePost(`${BASE_URL}/a/carintroduction/store`, {
            unloading_date: unloadingDate,
            unloading_tonnage: unloadingTonnage,
            difference: difference,
            allowable_deficit: allowableDeficit,
            deficit_or_surplus: deficitOrSurplus,
            unloading_receipt: unloadingReceipt,
        });
    }

    async updateCarIntroductionThirdStep(
        id,
        unloadingDate,
        unloadingTonnage,
        difference,
        allowableDeficit,
        deficitOrSurplus,
        unloadingReceipt
    ) {
        return await this.handlePost(
            `${BASE_URL}/a/carintroduction/update/${id}`,
            {
                unloading_date: unloadingDate,
                unloading_tonnage: unloadingTonnage,
                difference: difference,
                allowable_deficit: allowableDeficit,
                deficit_or_surplus: deficitOrSurplus,
                unloading_receipt: unloadingReceipt,
            }
        );
    }

    async deleteCarIntroduction(id) {
        return await this.handlePost(
            `${BASE_URL}/a/carintroduction/delete/${id}`
        );
    }
}
