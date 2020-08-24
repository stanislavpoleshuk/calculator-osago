import {IOsago} from "../src/client/Client";

var fetch = typeof window !== 'undefined' ? window.fetch : require('node-fetch');

export class Calculator {
    static async fetchMd(): Promise<IOsago> {
        const response = await fetch('http://webapistrahovanie.it-trends.net/api/v1-web/Calculator/GetCalcParamByType?Key=osagomd&Type=1')
        const data = await response.json();
        return data;
    }

    static async fetchPMR(): Promise<IOsago> {
        const response = await fetch('http://webapistrahovanie.it-trends.net/api/v1-web/Calculator/GetCalcParamByType?Type=0')
        const data = await response.json();
        return data;
    }
}