import Api from "./Api";

export class ServiceFilter extends Api{

    constructor(table = [], query = { id: null }) {
        super(table, query);
        this.publicKey = '94af0665e97e68ff6637fc1e6d1daf7e';
        this.privateKey = 'a3b29e77d004afdc0c0d49f34173dbba30f288f1';

    }

}