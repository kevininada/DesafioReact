import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarItemC = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItemCompras = async () => {
        await axios.get(api + "/listaitemcompras")
            .then((response) => {
                console.log(response.data.itemcompras);
                setData(response.data.itemcompras);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };

    const delItemC = async(idCliente) =>{
        console.log(idCliente);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api="/excluir-itemcompra/"+idCliente,{headers})
        .then((response)=>{
            console.log(response.data.type);
            console.log(response.data.message);
            getItemCompras();
        })
        .catch(()=>{
            setStatus({
                type: 'error',
                message: 'Erro: não foi possível conectar-se com a API.'
            });
        });
    };


    useEffect(() => {
        getItemCompras();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do Item da Compra</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastraritemcompra"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Compra ID</th>
                            <th>Produto ID</th>
                            <th>quantidade</th>
                            <th>valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th>{item.CompraId}</th>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-itemcompra/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Consultar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm" onClick={()=> delItemC(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};