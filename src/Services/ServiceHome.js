import Api from "./Api";

export class ServiceHome extends Api{

    constructor(table = [], query = { id: null }) {
        super(table, query);
        this.publicKey = 'fa5c8c5457c466faa64e940e5c94ace2';
        this.privateKey = '011c31d0b5c32209e6130eae3866eb5145199bea';

    }

}