import {Calculator} from "../data/calculator";
import {PmrCalculator} from "./calculator/pmr.calculator";

function pmr() {
    Calculator.fetchPMR().then(x=> {
        const mdCalc = new PmrCalculator(x);
    })
}

pmr();