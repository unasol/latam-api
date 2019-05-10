import program from "./programs";
import member from "./members";
import accrual from "./accrual";
import transaction from "./transactions";
export default class Latam {
  constructor(config) {
    this.accessToken = config.accessToken;
    this.program = program(this.accessToken);
    this.member = member(this.accessToken);
    this.accrual = accrual(this.accessToken);
    this.transaction = transaction(this.accessToken);
  }
}
