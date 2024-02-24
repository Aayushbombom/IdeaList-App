import axios from 'axios';
class IdeaAPI {

    constructor(){
        this.api_url = "http://localhost:5000/api/ideas"
    }

    getIdeas(){
        return axios.get(this.api_url);
    }

    createIdea(idea){
        return axios.post(this.api_url,idea);
    }

    deleteIdea(id){
        const username = localStorage.getItem('username') || '';

        return axios.delete(`${this.api_url}/${id}`, {
             data: {
                username
             }
        });
    }
}

export default new IdeaAPI();