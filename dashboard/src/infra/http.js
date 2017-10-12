const baseUrl = "http://localhost:8000";



class Http {

    request(url, method, body) {
        return fetch(`${baseUrl}${url}`, { body, method }).then(r => r.json());
    }

    get(url) {
        return this.request(url, "GET");
    }

    post(url, body) {
        return this.request(url, "POST", body);
    }




}


export default Http;