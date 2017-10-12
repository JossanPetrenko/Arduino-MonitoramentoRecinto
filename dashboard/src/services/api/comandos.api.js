import Http from '../../infra/http';



class ComandosApi {

    constructor() {
        this.http = new Http();
    }

    send(comando) {

        return this.http.post("/comandos");

    }

}


export default new ComandosApi();