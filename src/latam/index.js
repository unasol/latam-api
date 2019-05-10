import program from "./programs";
import member from "./members";
import accrual from "./accrual";
import transaction from "./transactions";
export default class Latam {
  constructor(config) {
    this.accessToken = config.accessToken;
    this.program = program();
    this.member = member();
    this.accrual = accrual();
    this.transaction = transaction();
  }
}
