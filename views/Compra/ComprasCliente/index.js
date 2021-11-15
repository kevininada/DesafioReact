import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ComprasCliente = (props) => {

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id)

    useEffect(() => {
        const getCompras = async () => {
            await axios.get(api + "/cliente/" + id + "/compras")
                .then((response) => {
                    console.log(response.data.compras);
                    setData(response.data.compras);
                })
                .catch(() => {
                    console.log("Erro: sem conexão com a API.")
                })
        }
        getCompras();
    }, [id]);


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Compras do Cliente</h1>
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
                        {data.map(compras => (
                            <tr key={compras.id}>
                                <td>
                                    {compras.id}
                                </td>
                                <td>
                                    {compras.ClienteId}
                                </td>
                                <td>
                                    {compras.data}
                                </td>
                                <td>
                                    <Link to={"/editar-compra/" + compras.id}
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
