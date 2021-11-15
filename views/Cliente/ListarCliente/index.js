import axios from "axios";
import { Alert, Container, Table } from "reactstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../config";

export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                });
            });
    };

    const delClientes = async(idCliente) =>{
        console.log(idCliente);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api="/excluir-cliente/"+idCliente,{headers})
        .then((response)=>{
            console.log(response.data.type);
            console.log(response.data.message);
            getClientes();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se com a API.'
            });
        });
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualização dos Clientes</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarcliente" className="btn btn-outline-success btn-sm">Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table borderless>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Cliente Desde</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(clientes => (
                            <tr key={clientes.id}>
                                <td>{clientes.id}</td>
                                <td>{clientes.nome}</td>
                                <td>{clientes.nascimento}</td>
                                <td>{clientes.createdAt}</td>
                                <td className="text-center/">
                                    <Link to={"/pedidos-clientes/" + clientes.id}
                                        className="btn btn-outline-success btn-sm">Consultar</Link>
                                        <span className="btn btn-outline-danger btn-sm" onClick={()=> delClientes(clientes.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};