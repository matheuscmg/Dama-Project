import React from 'react';

import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landingpage from "./pages/User/Landingpage"

import Modal from './components/homepage/Modal';
import TelaConfirmacao from './pages/User/TelaConfirmacao';
import Modalinvite from './components/homepage/Modalinvite';
import Logar from './pages/User/Logar';
import CadastroContratante from './pages/User/CadastroContratante';
import Tipodeemrpesa from './pages/User/Tipodeempresa';
import CadastroPrestadora from './pages/User/CadastroPrestadora';
import Project from './pages/Projetos/Project';


import store from './components/store'
import { Provider } from 'react-redux'

import Monitoramento from './pages/Monitoramento/MonitoramentoProjetos/Monitoramento';


import Monitoramentos from './pages/Monitoramento/Monitoramentos';
import TodoCadastro from './components/SemCadastro/TodoCadastro';
import HomePage from './pages/HomePage/HomePage';
import LocalReferencia from './pages/Monitoramento/LocalReferencia/LocalReferencia';
import PontoColeta from './pages/Monitoramento/PontoColeta/PontoColeta';
import RecuperarSenha from './pages/Login/RecuperarSenha/RecuperarSenha';
import Especies from './pages/Especies/Especies';
import Amostra from './pages/Monitoramento/Amostras/Amostra';
import Deash from './components/Deashboards/Deash';
import Dashboards from './pages/Dashboards/Dashboards';
import Detalhe from './pages/Monitoramento/Amostras/Detalhes/Detalhe';
import Equipe from './pages/Equipes/Equipe';
import EditEquipe from './pages/Equipes/EditEquipe';
import Membros from './pages/Membros/Membros';
import LandingNew from './pages/LadingPageNew/Landingpage'
import DeashboardsAmostra from './pages/Monitoramento/DashboardsAmostra/DeashboardsAmostra';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
        <Route path="/complete-cadastro" element={<TodoCadastro/>} />


          <Route path="/" element={<LandingNew />} />
          <Route path="/land" element={<Landingpage />} />


          <Route path="/login" element={<Logar />} />
          <Route path="/confirm" element={<TelaConfirmacao />} />
          <Route path="/cadastro-contratante" element={<CadastroContratante />} />
          <Route path="/cadastro-prestadora" element={<CadastroPrestadora />} />
          <Route path="/escolher-empresa" element={<Tipodeemrpesa />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha/>}/>

          <Route path="/home" element={< HomePage/>} />
          <Route path="/modal" element={<Modal />} />
          <Route path="/colaboradores" element={<Membros/>} />

          <Route path="/invite" element={<Modalinvite />} />
          <Route path="/equipes" element={<Equipe/>} />
          <Route path="/equipe-membros" element={<EditEquipe/>} />


          <Route path="/projetos" element={<Project />} />
          
          
          <Route path="/especies" element={<Especies />} />

          <Route path="/monitoramento" element={<Monitoramento />} />
          <Route path="/monitoramentos" element={<Monitoramentos/>} />
          <Route path="/local-referencia" element={<LocalReferencia />} />
          <Route path="/ponto-coleta" element={<PontoColeta />} />
          <Route path="/amostra" element={<Amostra />} />
          <Route path="/detalhes" element = {<Detalhe/>}/>
          <Route path="/dashboards" element = {<Dashboards/>}/>
          <Route path="/graficos" element = {<DeashboardsAmostra/>}/>
          

          <Route path="/deash" element = {<Deash/>}/>
          

        </Routes>
      </Provider>
    </BrowserRouter>

  </React.StrictMode>
);

