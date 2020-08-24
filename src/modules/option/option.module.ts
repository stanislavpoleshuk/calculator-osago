import {ConfigObjectOption, IConfigObject} from "../../client/Client";
import {SubOptionsModule} from "./sub-options.module";

type ParentType = IOptionModule | undefined;

export interface IOptionModule {
    config: IConfigObject;

    readonly isVisible: boolean;
    readonly value: number;
    readonly parent: ParentType;
    readonly subOptions: SubOptionsModule | undefined;

    onPress: (option: ConfigObjectOption) => void;
    link: (parent: ParentType) => void;
}

export class OptionModule implements IOptionModule {
    config: IConfigObject;
    private _value: number;
    private _parent?: ParentType;
    private _subOptions?: SubOptionsModule;

    constructor(config: IConfigObject) {
        this.config = config;
        const firstOption = config.options?.find(x => x);
        this._value = firstOption ? firstOption.id : 0;
        this._subOptions = new SubOptionsModule(firstOption?.subOptions);
    }

    public get isVisible(): boolean {
        if (!this.parent)
            return true;
        return this.parent.value != this.config.parentDisableId;
    }

    public get value(): number {
        return this._value;
    }

    public get subOptions(): SubOptionsModule | undefined {
        return this._subOptions;
    }

    public get parent(): ParentType {
        return this._parent;
    }

    private setValue(value: number | undefined) {
        this._value = value ? value : 0;
    }

    public onPress(option: ConfigObjectOption) {
        if (option.id == this.value) return;
        this.setValue(option.id);
        this._subOptions = new SubOptionsModule(option.subOptions);
    }

    public link(parent: ParentType) {
        this._parent = parent;
    }
}