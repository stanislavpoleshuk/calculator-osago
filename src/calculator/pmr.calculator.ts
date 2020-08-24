import {CalculatorInsurance} from "../modules/calculator-insurance";
import {CalculatorType, IOsago} from "../client/Client";

export class PmrCalculator extends CalculatorInsurance {
    constructor(osago: IOsago) {
        super(osago.key, osago.name, CalculatorType.OsagoPmr);
        this.bind(osago.options)
    }
}