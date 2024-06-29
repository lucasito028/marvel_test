export class Api  {

    constructor(table, query = { id: null,}) {
        this.table = table
        this.query = query;
        this.publicKey = 'e053145fd0982715b5cdb1bb9e5fe0c2';
        this.hash = '5d30905a04649c736f3cdf33c95b81db';
    }

    buildUrl() {
        
        let url = `https://gateway.marvel.com/v1/public/${this.table}`;

        const {id} = this.query;

        //console.log(this.query);
        
        if (id) {

            this.query = null;
            //console.log(id);
            //console.log(this.query);
            
            url += `/${id}?ts=1&apikey=${this.publicKey}&hash=${this.hash}`;
        } else {
            url += `?noVariants=true&formatType=comic&`;

            for (const [key, type] of Object.entries(this.query)) {
                if (type) {
                    //console.log(this.query);
                    url += `${key}=${type}&`;
                }
            }

            url += `&ts=1&apikey=e053145fd0982715b5cdb1bb9e5fe0c2&hash=5d30905a04649c736f3cdf33c95b81db`;
        }
        return url;
    }

    async select() {
        const url = this.buildUrl();
        const response = await fetch(url);
        const data = await response.json();
        return data.data.results;
    }

}
