import program from "./programs";
import member from "./members";
import accrual from "./accrual";
import transaction from "./transactions";
import * as ClientOAuth2 from "client-oauth2";
import instance from "./config";

export default class Latam {
    config: any;
    environment: string;

    constructor(config: any) {
        // support only client_credentials
        this.config = config.client_credentials;
        this.environment = config.environment || "dev";
    }

    async program() {
        await this.createInstance();
        return program(this._isDebug());
    }
    async accrual() {
        await this.createInstance();
        return accrual(this._isDebug());
    }
    async transaction() {
        await this.createInstance();
        return transaction(this._isDebug());
    }

    async member() {
        await this.createInstance();
        return member(this._isDebug());
    }

    async createInstance() {
        const user = await this.getToken();
        let apiUrl = "https://test.api.latam-pass.latam.com";
        if (!this._isDebug())
            apiUrl = "https://api.latam-pass.latam.com";
        instance(apiUrl, user.accessToken);
    }

    _isDebug = () => this.environment != "production";

    getToken() {
        const oauth2 = new ClientOAuth2(this.config);
        return oauth2.credentials.getToken();
    }
}
