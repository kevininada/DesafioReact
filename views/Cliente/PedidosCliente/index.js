import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const PedidosCliente = (props) => {
    //console.log(props.match.params.id)

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id)

    useEffect(() => {
        const getPedidos = async () => {
            await axios.get(api + "/cliente/" + id + "/pedidos")
                .then((response) => {
                    console.log(response.data.pedidos);
                    setData(response.data.pedidos);
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.")
                })
        }
        getPedidos();
    }, [id]);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Pedidos do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente" className="m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                    </div>
                </div>
                <Table
                >
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                ClienteID
                            </th>
                            <th>
                                Data
                            </th>
                            <th>
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(pedidos => (
                            <tr key={pedidos.id}>
                                <td>
                                    {pedidos.id}
                                </td>
                                <td>
                                    {pedidos.ClienteId}
                                </td>
                                <td>
                                    {pedidos.data}
                                </td>
                                <td>
                                    <Link to={"/editar-pedido/" + pedidos.id}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
