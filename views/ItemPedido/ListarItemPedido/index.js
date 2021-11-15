import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarItemP = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItemPedidos = async () => {
        await axios.get(api + "/listaitempedidos")
            .then((response) => {
                console.log(response.data.itempedidos);
                setData(response.data.itempedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };

    const delItemP = async(idCliente) =>{
        console.log(idCliente);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api="/excluir-itempedido/"+idCliente,{headers})
        .then((response)=>{
            console.log(response.data.type);
            console.log(response.data.message);
            getItemPedidos();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se com a API.'
            });
        });
    };

    useEffect(() => {
        getItemPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do Item do Pedido</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastraritempedido"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Pedido ID</th>
                            <th>Serviço ID</th>
                            <th>quantidade</th>
                            <th>valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.PedidoId}</th>
                                <td>{item.ServicoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-itempedido/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> delItemP(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};