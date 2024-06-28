export class Query {
    constructor(query = { id: null, limit: 20, title: null }) {
        this.query = query;
    }

    buildUrl() {
        
        let url = `https://gateway.marvel.com/v1/public/comics`;

        const { id, limit } = this.query;

        if (id) {
            url += `/${id}?ts=1&apikey=e053145fd0982715b5cdb1bb9e5fe0c2&hash=5d30905a04649c736f3cdf33c95b81db`;
        } else {
            url += `?limit=${limit}`;

            for (const [key, type] of Object.entries(this.query)) {
                if (type && key !== 'id' && key !== 'limit') { // Exclude id and limit from being added again
                    url += `&${key}=${type}`;
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

/*
// Uso da classe Query fora de um componente React
const fetchComics = async () => {
    const queryInstance = new Query({ limit: 10, title: 'Spider-Man'  });
    try {
        const comics = await queryInstance.select();
        console.log(comics);
    } catch (error) {
        console.error('Error fetching comics:', error);
    }
};
*/
