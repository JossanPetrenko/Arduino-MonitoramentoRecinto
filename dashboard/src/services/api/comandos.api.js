import Http from '../../infra/http';



class ComandosApi {

    constructor() {
        this.http = new Http();
    }

    send(comando) {

        return this.http.get("/create-command?command=" + comando);

    }


    turnLedOn(){
        return this.send("turn-led-on");
    }

    
    turnLedOff(){
        return this.send("turn-led-off");
    }

    
    turnLedAuto(){
        return this.send("turn-led-auto");
    }

}


export default new ComandosApi();