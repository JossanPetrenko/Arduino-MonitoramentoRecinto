import Http from '../../infra/http';



class SensorsApi {

    constructor() {
        this.http = new Http();
    }

    getAll() {

        return this.http.get("/sensors");

    }

}


export default new SensorsApi();