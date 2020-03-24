
import { environment } from '../../environments/environment';

export class Url {
    static get url() {
        if (environment.production == false) {
            return "http://localhost:4000";
        }
        else {
            return "http://13.127.244.180:4000";
        }
    }
}