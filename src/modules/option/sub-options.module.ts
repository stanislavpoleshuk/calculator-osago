import {IConfigSubOption} from "../../client/Client";

export class SubOptionsModule {
    options: Array<IConfigSubOption>;
    private _value: number | undefined;

    constructor(options: Array<IConfigSubOption> | undefined) {
        this.options = options ?  options : [];
    }

    public get value(): number | undefined {
        return this._value;
    }

    private setValue(value: number | undefined) {
        this._value = value ? value : 0;
    }

    public onPress(option: IConfigSubOption) {
        this.setValue(option.id);
    }
}
