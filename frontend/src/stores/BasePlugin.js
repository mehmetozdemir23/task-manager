import axios from "axios";

axios.defaults.withCredentials = true;

export function BasePlugin(context) {
    return {
        collection: [],
        BASE_URL: import.meta.env.VITE_BASE_URL,
        API_URL: context.store.$state.API_URL,
        errors: {},
        get fullUrl() {
            return this.BASE_URL + this.API_URL;
        },
        getInstanceById(id) {
            return this.collection.find(instance => instance.id == id);
        },
        async fill() {
            if (this.collection.length < 1)
                await this.fetch();
        },
        async fetch() {
            this.collection = await this._call({ method: 'get', url: this.fullUrl });
        },
        async add(instance) {
            const data = await this._call({ method: 'post', url: this.fullUrl, data: instance });
            if(data)
                this.collection.push(data);
        },
        async update(instance) {
            const data = await this._call({ method: 'patch', url: `${this.fullUrl}/${instance.id}`, data: instance });
            if(data){
                const index = this.collection.findIndex(instance => instance.id === data.id);
                if (index !== -1) {
                    this.collection[index] = data;
                }
            }
        },
        async delete(instance) {
            await this._call({ method: 'delete', url: `${this.fullUrl}/${instance.id}` })
            this.collection = this.collection.filter(el => el.id !== instance.id)
        },
        async _call({ method, url, data }) {
            try {
                const response = await axios({ method, url, data });
                return response.data.data;
            } catch (error) {
                console.log(error.response.data);
                this.errors = error.response.data.errors;
                for (const field in this.errors)
                    this.errors[field] = this.errors[field][0];
            }
        }

    };
}
