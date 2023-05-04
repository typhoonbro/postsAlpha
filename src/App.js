import { updateDoc, doc, getDoc, getDocs, collection, addDoc } from 'firebase/firestore';
import {db} from './firebaseConnection.js';
import {useEffect, useState} from 'react';
import { Modal } from 'bootstrap';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState('');
  const [idPostEdit, setIdPostEdit] = useState('');
  const [tituloEdit, setTituloEdit] = useState('');
  const [autorEdit, setAutorEdit] = useState('');
  useEffect(()=>{
  
      
         // Funcao para busca dos posts em geral, inicia com o carregamento da pagina
          async function handleGet(){
            await getDocs(collection(db, 'posts'))
            .then((snapshot)=>{
              let list = [];
              snapshot.forEach((doc)=>{
                list.push({
                  id: doc.id,
                  titulo: doc.data().titulo,
                  autor: doc.data().autor
                })
              })
  
              setPosts(list);
            })
            .catch((error)=>{
              alert(error)
            })
          };
          handleGet();
      
    
  },[])
  async function handleCreate(e) {
    e.preventDefault();
    await addDoc(collection(db,'posts'), {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      alert('Salvo com sucesso!')
      handleGet();
    })
    .catch((error) => {
      alert("Erro: "+error)
    })
    

  }
  async function handleGet(){
    

    await getDocs(collection(db, 'posts'))

    .then((snapshot)=>{
      let list = [];
      snapshot.forEach((doc)=>{
        list.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })

      setPosts(list);
    })
    .catch((error)=>{
      alert(error)
    })

    
    
  };
  // Funcao para busca filtrada
  async function handleSearch(e) {
    e.preventDefault();

    await getDoc(doc(db,'posts',idPost))
    .then((snapshot) => {
      let list = [];
      list.push(snapshot.data());
      setPosts(list);
    })
    .catch(() => {
      alert("Erro")
    })
    

  }
  function cleanEditModal() {
    setIdPostEdit('');
    setAutorEdit('');
    setTituloEdit('');
    
  }
  async function editPost(postid) {

    await updateDoc(doc(db,'posts',postid), {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      alert('Salvo com sucesso!')
      handleGet();
    })
    .catch((error) => {
      alert("Erro: "+error)
    })
  }
  return (
    <div className="App">
      
      {/* modal de edit post */}
      <div class="modal fade" id='editPostModal'>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Editar post</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={cleanEditModal}></button>
            </div>
            <div class="modal-body">
            <div class="mb-3">
              <label for='postIdEdit'>ID</label>
              <input disabled type="text" class="form-control" id="postIdEdit" value={idPostEdit} onChange={(e) => {setIdPost(e.target.value)}}></input>
              <label for="postTitleEdit" class="form-label" >Titulo do post</label>
              <textarea value={tituloEdit} type="text" class="form-control" id="postTitleEdit" aria-describedby="postTitle" placeholder='Digite o título' onChange={(e)=> {
                setTitulo(e.target.value);
                setTituloEdit(e.target.value);
              }}/>
            </div>
            <div class="mb-3">
              <label for="postAutorEdit" class="form-label" >Autor do post</label>
              <input type="text" class="form-control" id="postAutorEdit" placeholder='Digite o autor'  value={autorEdit} onChange={(e)=>{
                setAutor(e.target.value);
                setAutorEdit(e.target.value)
              } }/>
            </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={cleanEditModal}>Close</button>
              <button type="button" class="btn btn-primary" onClick={() => {editPost(idPostEdit)}}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <h1>React + Firebase</h1>

      <div className='container post-create'>
       {/* Formulario de busca filtrada */}
        <form onSubmit={handleSearch}>
          <div class="mb-3">
            <label for="idPost" class="form-label" >Autor do post</label>
            <input type="text" class="form-control" id="idPost" placeholder='Digite o id do post' onChange={(e)=> setIdPost(e.target.value)}/>
          </div>
          <button type="submit" class="btn btn-primary">Pesquisar</button>
        </form>


       
        {/* Formulario de criação de posts */}


        <form onSubmit={handleCreate}>
          <div class="mb-3">
            <h4>Cadastro</h4>
            <label for="postTitle" class="form-label" >Titulo do post</label>
            <textarea value={titulo} type="text" class="form-control" id="postTitle" aria-describedby="postTitle" placeholder='Digite o título' onChange={(e)=> setTitulo(e.target.value)}/>
          </div>
          <div class="mb-3">
            <label for="author" class="form-label" >Autor do post</label>
            <input type="text" class="form-control" id="author" placeholder='Digite o autor'  value={autor} onChange={(e)=> setAutor(e.target.value)}/>
          </div>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </form> 

        

       <ul className='list-group'>
       {posts.map( (post) => {
          return(
            <li key={post.id} className='list-group-item'>
              <p>Título: {post.titulo}</p>
              <p>Autor: {post.autor}</p>
              <button type='button' className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#editPostModal' onClick={() => {
                setIdPostEdit(post.id);
                setAutorEdit(post.autor);
                setTituloEdit(post.titulo);
              }} >Editar</button>
            </li>
          )
        })}
       </ul>
        
      </div>
    </div>
  );
}

export default App;
