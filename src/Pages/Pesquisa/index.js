import { updateDoc, doc, getDoc, getDocs, collection, addDoc, deleteDoc } from 'firebase/firestore';
import {db} from '../../firebaseConnection.js';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {Modal} from 'bootstrap';

function Pesquisa() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [posts, setPosts] = useState([]);
    const [idPost, setIdPost] = useState('');
    const [idPostEdit, setIdPostEdit] = useState('');
    const [tituloEdit, setTituloEdit] = useState('');
    const [autorEdit, setAutorEdit] = useState('');
    const [idSearch, setIdSearch] = useState('');
    
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

    async function editPost(id) {
        await updateDoc(doc(db, 'posts', id), {
            titulo: titulo,
            autor: autor
        })
        .then(()=>{
            toast.success('Post editado com sucesso!');
            handleGet();
        })
        .catch((error) => {
            toast.warn('Ops! '+error)
        })
    }
    function cleanEditModal() {
        setIdPostEdit('');
        setAutorEdit('');
        setTituloEdit('');
        setIdPost('');
        setAutor('');
        setTitulo('');
    }
    async function excluirPost(id) {
        await deleteDoc(doc(db, 'posts', id))
        .then(() => {
            toast.success('Post excluindo com sucesso!')
            handleGet();
        })
        .catch((error)=>{
            toast.warning('Ops!! ' + error)
        })
    }


    // Funcao para busca filtrada
    async function handleSearchModal() {
       
        if(idSearch === '') {
            handleGet();
        } else {
            await getDoc(doc(db,'posts',idSearch))
            .then((snapshot) => {
            let list = [];
            console.log(snapshot.data());
            list.push(snapshot.data());
            const listFiltro = list.filter(filtro);
            function filtro(item) {
                return item.id = idSearch
            }
            setPosts(listFiltro);
            })
            .catch(() => {
                alert("Erro")
            })
        
       
        }
        
    }
    // Funcao para busca dos posts em geral
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
      

      
    return(
        
        <div className='container'>
            {/* Modal de editar */}
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
                <button type="button" data-bs-dismiss='modal' data-bs-target='#editPostModal' class="btn btn-primary text-light" onClick={() => {
                    editPost(idPostEdit);
                    
                    }}
                    >Save changes</button>
            </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id='searchPostModal'>
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Editar post</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for='postIdSearch'>ID</label>
                    <input type="text" class="form-control" id="postIdSearch" onChange={(e)=> {
                setIdSearch(e.target.value);
                
                }} ></input>
                </div>
            

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                <button type="button" data-bs-dismiss='modal' data-bs-target='#searchPostModal' class="btn btn-primary text-light" onClick={() => {
                    handleSearchModal(idSearch);
                    
                    }}
                    >Pesquisar</button>
            </div>
            </div>
        </div>
    </div>        

            <h1 className=' text-center'>Pesquisar</h1>
           
            
                <div className='container text-center mb-4'>
                    <button type="button" class="btn btn-primary text-light me-1" data-bs-toggle='modal' data-bs-target='#searchPostModal'>Pesquisar</button>
                    <button type='button' className='btn btn-secondary' onClick={handleGet}>Limpar pesquisa</button>
                </div>
                
          
            <ul className='list-group border border-3 border-primary rounded-2'>
                {posts.map( (post) => {
                return(
                    <li key={post.id} className='list-group-item'>
                    <p>Título: {post.titulo}</p>
                    <p>Autor: {post.autor}</p>
                    <p><strong>ID: {post.id}</strong></p>
                    <button type='button' data-bs-toggle='modal' data-bs-target='#editPostModal' className='btn btn-primary text-light me-1'   onClick={() => {
                        setIdPostEdit(post.id);
                        setAutorEdit(post.autor);
                        setTituloEdit(post.titulo);
                        setIdPost(post.id);
                        setAutor(post.autor);
                        setTitulo(post.titulo);
                    }} >Editar</button>
                    <button type='button' className='btn btn-danger ' onClick={() => {excluirPost(post.id)}}>Excluir</button>
                    </li>
                )
                })}
            </ul>            
        </div>
               
    )
}
export default Pesquisa;