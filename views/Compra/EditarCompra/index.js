import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const EditarCompra = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.put(api + "/compra/" + id,
            { id, data, ClienteId }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração feita com sucesso.'
                })
                console.log(response.data.type);
                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível acessar a API.'
                });
            });
    };

    useEffect(() => {
        const getCompra = async () => {
            await axios(api + "/compra/" + id)
                .then((response) => {
                    setId(response.data.compra.id);
                    setData(response.data.compra.data);
                    setClienteId(response.data.compra.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi se conectar com a API.")
                })
        }
        getCompra();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-cliente"
                            className="m-auto btn btn-outline-primary btn-sm">Clientes</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                    </div>
                    <Form className="p-2" onSubmit={editCompra}>
                        <FormGroup className="p-2">
                            <Label>ID da Compra</Label>
                            <Input name="id" placeholder="ID da compra" type="text"
                                defaultValue= {id}/>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Data da Compra</Label>
                            <Input name="data" placeholder="data da compra" type="text"
                                value = {data}
                                onChange={e => setData(e.target.value)} />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>ID do Cliente</Label>
                            <Input name="ClienteId" placeholder="id do cliente" type="text"
                                defaultValue={ClienteId}/>
                        </FormGroup>

                        <Button type="submit" outline color="warning">Salvar</Button>
                        <Button type="reset" outline color="primary">Limpar</Button>
                    </Form>
            </Container>
        </div>
    )
}