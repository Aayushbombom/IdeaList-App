import IdeaAPI from "../services/ideaApi";
class IdeaList {
    constructor(){
       this._ideaList = document.querySelector('#idea-list');
       this._ideas = [];
       this.getIdea();
       this._tagColors = new Set(['technology', 'software', 'business', 'education', 'health', 'inventions']);
    }   

    getTagColor(tag){
        if(this._tagColors.has(tag.toLowerCase())){
            return `tag-${tag.toLowerCase()}`;
        }
        else{
            return '';
        }
    }

    addIdeaToList(idea){
      this._ideas.push(idea);
      this.init();
    }

    async getIdea(){
      try {
        const res = await IdeaAPI.getIdeas();
        this._ideas = res.data.data;
        this.init();
      } catch (error) {
        console.log(error);
      } 
       
    }

    async deleteIdea(id){
      try {
        await IdeaAPI.deleteIdea(id);
      } catch (error) {
        console.log(error);
      }
    }


    init(){
        this._ideaList.innerHTML = this._ideas.map((idea) =>{
              const tagColor = this.getTagColor(idea.tag);
              const deleteBtn = localStorage.getItem('username') === idea.username ? `<button class="delete"><i class="fas fa-times"></i></button>
              ` : '';
              return `<div class="card" data-id="${idea._id}">
              ${deleteBtn}
              <h3>
                ${idea.text}
              </h3>
              <p class="tag ${tagColor}">${idea.tag.toUpperCase()}</p>
              <p>
                Posted on <span class="date">${idea.date.slice(0,10)}</span> by
                <span class="author">${idea.username}</span>
              </p>
            </div>`
        }).join('');

        this._ideaList.addEventListener('click', ((e) => {
          if(e.target.classList.contains('fa-times')){
            e.stopImmediatePropagation();
            const id = e.target.parentElement.parentElement.dataset.id;
            this.deleteIdea(id);
            this.getIdea();
          }
        }).bind(this))
    }
}

export default IdeaList;