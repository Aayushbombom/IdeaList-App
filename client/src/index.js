import '@fortawesome/fontawesome-free/css/all.css'
import './css/style.css';
import Modal from './components/Modal.js'
import IdeaForm from './components/IdeaForm.js';
import IdeaList from './components/IdeaList.js';



const modal = new Modal();
modal.init();

const ideaform = new IdeaForm();
ideaform.init();

const ideaList = new IdeaList();
