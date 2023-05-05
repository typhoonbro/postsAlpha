import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './Pages/Home';
import Pesquisa from './Pages/Pesquisa';
import Cadastro from './Pages/Cadastro';
import Error from './Pages/Error';



function RoutesApp() {
    return(
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/Pesquisar' element={<Pesquisa/>}/>
                <Route path='/Cadastrar' element={<Cadastro/>}/>
    
    
                <Route path='*' element={<Error/>}/>
    
    
    
            </Routes>    
        </BrowserRouter>
    
    )
}
export default RoutesApp;