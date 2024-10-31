const cds = require("@sap/cds");

class AdminService extends cds.ApplicationService {
  init() {
    const { Authors } = this.entities;

    this.before(["CREATE", "UPDATE"], Authors, this.validateLifeData);

    return super.init();
  }

  validateLifeData(req) {
    const { dateOfBirth, dateOfDeath } = req.data;
    if (!dateOfBirth || !dateOfDeath) {
      return;
    }

    const birth = new Date(dateOfBirth);
    const death = new Date(dateOfDeath);

    if (death < birth) {
      req.error(
        `The date of death (${dateOfDeath}) cannot be earlier than the date of birth (${dateOfBirth}).`
      );
    }
  }
}

module.exports = AdminService;