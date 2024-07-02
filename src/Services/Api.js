export class Api  {

    constructor(table = [], query = { id: null }) {
        this.table = table
        this.query = query;
        this.publicKey = 'e053145fd0982715b5cdb1bb9e5fe0c2';
        this.hash = '5d30905a04649c736f3cdf33c95b81db';
    }

    getBrazilianDate(date = new Date()) {
        const options = { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('pt-BR', options).format(date).split('/').reverse().join('-');
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
            url += `?`

            //url += `?ts=1&apikey=${this.publicKey}&hash=${this.hash}`;
        } else {

            url += `?`

            for (const [key, type] of Object.entries(this.query)) {
                if (Boolean(type)) {
                    if(Array.isArray(type) && type.length === 2){
                        if(type[0] > type[1]){
                                //console.log("Trocando Valores")
                                //console.log(`Antes: ${type}`)
                                /*
                                let aux = type[0] 
                                type[0] = type[1] 
                                type[1] = aux
                                */
                                [type[0], type[1]] = [type[1], type[0]];
                                //console.log(`Depois: ${type}`)
                            }
                            
                            const dateBefore = this.getBrazilianDate(new Date(new Date().setMonth(new Date().getMonth() - 1)));

                            type[0] = type[0] ? type[0] : dateBefore;
                            type[1] = type[1] ? type[1] : this.getBrazilianDate();
    
                            if (new Date(type[1]) > new Date(this.getBrazilianDate())) {
                                type[1] = this.getBrazilianDate();
                            }
                
                        url += `${key}=${type[0]}%2C%${type[1]}&`;
                    }else{
                        url += `${key}=${type}&`;
                    }
                }
            }
            //url += `ts=1&apikey=${this.publicKey}&hash=${this.hash}`;
        }
        url += `ts=1&apikey=${this.publicKey}&hash=${this.hash}`;
        console.log(url)
        return url;
    }

    async select() {
        try{
            const url = this.buildUrl();
            const response = await fetch(url);
            const data = await response.json();
            if(data && data.data && data.data.results){
                //console.log(data.data)
                return data.data;
            }else {
                throw new Error('API não responde');
            }
        }catch(error){
            throw error;
        }
    }

}
