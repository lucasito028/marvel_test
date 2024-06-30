export class Api  {

    constructor(table = [], query = { id: null }) {
        this.table = table
        this.query = query;
        this.publicKey = 'e053145fd0982715b5cdb1bb9e5fe0c2';
        this.hash = '5d30905a04649c736f3cdf33c95b81db';
    }

    buildUrl() {
        
        let url = `https://gateway.marvel.com/v1/public/${this.table[0]}`;

        const {id} = this.query;

        //console.log(this.query);
        
        if (id) {

            this.query = null;
            //console.log(id);
            //console.log(this.query);
            url += `/${id}`
            this.table[1] ? url += `/${this.table[1]}` : this.table[1];

            url += `?ts=1&apikey=${this.publicKey}&hash=${this.hash}`;
        } else {
            url += `?`
            if(this.table[0] == 'comics'){
                url += `noVariants=true&formatType=comic&`;
            }
            console.log(url)

            console.log(this.query);

            for (const [key, type] of Object.entries(this.query)) {
                if (type) {
                    if(type.length === 2){
                        if(type[0] > type[1]){
                                console.log("Trocando Valores")
                                console.log(`Antes: ${type}`)
                                let aux = type[0] 
                                type[0] = type[1] 
                                type[1] = aux
                                console.log(`Depois: ${type}`)
                            }
            
                        type[0] ? type[0] : type[0] = '2015-01-01';
                        type[1] ? type[1] : type[1] = '2024-06-29';
                
                        url += `${key}=${type[0]}%2C%${type[1]}&`;
                        //console.log(url)
                    }else{
                        url += `${key}=${type}&`;
                    }

                }
            }

            url += `&ts=1&apikey=e053145fd0982715b5cdb1bb9e5fe0c2&hash=5d30905a04649c736f3cdf33c95b81db`;
        }
        return url;
    }

    async select() {
        try{
            const url = this.buildUrl();
            const response = await fetch(url);
            const data = await response.json();
            if(data && data.data && data.data.results){
                return data.data.results;
            }else {
                console.log('API não está respondendo', data);
                throw new Error('API não responde');
            }
        }catch(error){
            throw error;
        }
    }

}
