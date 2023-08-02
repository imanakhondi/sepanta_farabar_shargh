import {  BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Driver extends Entity {
  constructor() {
    super();
  }

  async getDriver(id) {
    return await this.handlePostFile(`${BASE_URL}/a/drivers/show/${id}`);
  }

  async getAllDrivers() {
    return await this.handlePost(`${BASE_URL}/u/drivers`);
  }

  async storeDriver(
    name,
    family,
    nationalCode,
    mobile,
    driverLicenseNum,
    driverSmartCard
  ) {
    return await this.handlePost(`${BASE_URL}/a/drivers/store`, {
      name,
      family,
      national_no: nationalCode,
      mobile,
      license_no: driverLicenseNum,
      card_no: driverSmartCard,
    });
  }

  async deleteDriver(id) {
    return await this.handlePost(`${BASE_URL}/a/drivers/delete/${id}`);
  }
}
