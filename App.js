import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/Home';
import { Menu } from './components/menu';
import { ListarCliente } from './views/Cliente/ListarCliente';
import { ListarPedido } from './views/Pedido/ListarPedido';
import { ListarServico } from './views/Servico/ListarServico';
import { Item } from './views/Servico/Item';
import { ListarCompra } from './views/Compra/ListarCompra';
import { ListarItemC } from './views/ItemCompra/ListarItemCompra';
import { ListarItemP } from './views/ItemPedido/ListarItemPedido';
import { ListarProduto } from './views/Produto/ListarProduto';
import { Cadastrar } from './views/Servico/Cadastrar';
import { CadastrarCliente } from './views/Cliente/CadastrarCliente';
import { CadastrarProduto } from './views/Produto/CadastrarProduto';
import { CadastrarCompra } from './views/Compra/CadastrarCompra';
import { CadastrarItemPedido } from './views/ItemPedido/CadastrarItemPedido';
import { CadastrarPedido } from './views/Pedido/CadastrarPedido';
import { CadastrarItemCompra } from './views/ItemCompra/CadastrarItemCompra';
import { PedidosCliente } from './views/Cliente/PedidosCliente';
import { EditarPedido } from './views/Cliente/EditarPedido';
import { EditarCompra } from './views/Compra/EditarCompra';
import { ComprasCliente } from './views/Compra/ComprasCliente';
import { EditarItemCompra } from './views/ItemCompra/EditarItemCompra';
import { EditarItemPedido } from './views/ItemPedido/EditarItemPedido';
import { EditarServico } from './views/Servico/EditarServico';
import { EditarProduto } from './views/Produto/EditarProduto';


function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/listar-cliente" component={ListarCliente}/>
          <Route path="/listar-pedido" component={ListarPedido}/>
          <Route path="/listar-servico" component={ListarServico}/>
          <Route path="/listar-itempedido" component={ListarItemP}/>
          <Route path="/listar-pedido/:id" component={Item} />          
          <Route path="/listar-compra" component={ListarCompra}/>
          <Route path="/listar-produto" component={ListarProduto}/>
          <Route path="/listar-itemcompra" component={ListarItemC}/>
          <Route path="/cadastrarservico" component={Cadastrar}/>
          <Route path="/cadastrarcliente" component={CadastrarCliente}/>
          <Route path="/cadastrarproduto" component={CadastrarProduto}/>
          <Route path="/cadastrarcompra" component={CadastrarCompra}/>
          <Route path="/cadastraritempedido" component={CadastrarItemPedido}/>
          <Route path="/cadastrarpedido" component={CadastrarPedido}/>
          <Route path="/cadastraritemcompra" component={CadastrarItemCompra}/>
          <Route path="/pedidos-clientes/:id/" component={PedidosCliente}/>
          <Route path="/editar-pedido/:id" component={EditarPedido}/>
          <Route path="/editar-compra/:id"component={EditarCompra}/>          
          <Route path="/editar-itemcompra/"component={EditarItemCompra}/>
          <Route path="/editar-itempedido/"component={EditarItemPedido}/>
          <Route path="/editar-servico/:id"component={EditarServico}/>
          <Route path="/editar-produto/:id"component={EditarProduto}/> 
          <Route path="/compras-clientes/:id"component={ComprasCliente}/>
          <Route path="/pedidos-clientes/:id"component={PedidosCliente}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
