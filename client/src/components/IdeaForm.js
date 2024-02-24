import IdeaAPI from "../services/ideaApi";
import IdeaList from "./IdeaList";
class IdeaForm {

    constructor(){
        this._formModal = document.querySelector('#form-modal');
        this._form = document.querySelector('#idea-form');
        this._ideaList = new IdeaList();
    }

    init(){
        this._form.elements.username.value = localStorage.getItem('username') || '';
        this._form.addEventListener('submit', this.handleSubmit.bind(this));
    }


    async handleSubmit(e){
        e.preventDefault();

        if(!this._form.elements.text.value || !this._form.elements.tag.value || !this._form.elements.username.value){
            alert('Please fill all the fields!');
            return;
        }

        localStorage.setItem('username', this._form.elements.username.value)
        const idea = {
            text: this._form.elements.text.value,
            tag: this._form.elements.tag.value,
            username: this._form.elements.username.value
        }

        const newIdea = await IdeaAPI.createIdea(idea);

        this._ideaList.addIdeaToList(newIdea.data.data);
        
        this._form.elements.text.value = '';
        this._form.elements.tag.value = '';
        this._form.elements.username.value = localStorage.getItem('username') || '';
        
        

        document.dispatchEvent(new Event('closeModal'));
    }

}

export default IdeaForm;