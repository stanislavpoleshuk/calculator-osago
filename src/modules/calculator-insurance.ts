import {IOptionModule, OptionModule} from "./option/option.module";
import {CalcSelectValue, CalculatorType, ICalcSelectValue, IConfigObject} from "../client/Client";

export interface ICalculatorInsurance {
    name: string;
    options: Array<IOptionModule>;
    getParams: () => {};
}

interface ICalcParams {
    type: CalculatorType;
    key: string;
    values: CalcSelectValue[];
}

export abstract class CalculatorInsurance implements ICalculatorInsurance {
    name: string;
    key: string;
    type: CalculatorType;
    options: Array<IOptionModule> = [];

    constructor(key: string, name: string, type: CalculatorType) {
        this.key = key;
        this.name = name;
        this.type = type;
    }

    public bind(configOptions: IConfigObject[]) {
        const self = this;
        configOptions.map(x => {
            self.options.push(new OptionModule(x));
        });
        this.linking();
    }

    private linking() {
        const self = this;
        this.options.map(x => {
            if (x.config.parentDisableKey && x.config.parentDisableKey.length > 0) {
                const parent = self.options.find(y => y.config.key == x.config.parentDisableKey);
                parent && x.link(parent);
            }
        })
        // this.options.map(x => {
        //     console.log(`name: ${x.config.name} | parent: ${JSON.stringify(x.parent, null, 3)} | visible: ${x.isVisible}`)
        // })
    }

    getParams(): ICalcParams {
        const values: CalcSelectValue[] = this.options.reduce(function (accumulator: CalcSelectValue[], value) {
            accumulator.push(new CalcSelectValue({
                key: value.config.key,
                value: value.value,
                subValue: value.subOptions?.value
            }))
            return accumulator;
        }, []);

        return {
            key: this.key,
            values: values,
            type: this.type
        }
    }
}