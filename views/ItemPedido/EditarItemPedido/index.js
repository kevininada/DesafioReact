import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const EditarItemPedido = (props) => {

    const [PedidoId, setPedidoId] = useState(''); 
    const [ServicoId, setServicoId] = useState('');
    const [valor, setValor] = useState('');   
    const [quantidade, setQuantidade] =  useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editItemPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.put(api + "/itempedido/",
            { ServicoId, PedidoId, quantidade, valor }, { headers })
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
        const getItemPedido = async () => {
            await axios(api + "/itempedido/")
                .then((response) => {
                    setServicoId(response.data.itemcompra.ServicoId);
                    setPedidoId(response.data.itemcompra.PedidoId);
                    setQuantidade(response.data.itemcompra.quantidade);
                    setValor(response.data.itemcompra.valor);
                })
                .catch(() => {
                    console.log("Erro: não foi se conectar com a API.")
                })
        }
        getItemPedido();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item do Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-pedido"
                            className="m-auto btn btn-outline-primary btn-sm">Pedidos</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                    </div>
                    <Form className="p-2" onSubmit={editItemPedido}>
                        <FormGroup className="p-2">
                            <Label>ID do Pedido</Label>
                            <Input name="PedidoId" placeholder="ID do pedido" type="text"
                                defaultValue= {PedidoId}/>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>ID do Serviço</Label>
                            <Input name="ServicoId" placeholder="ID do serviço" type="text"
                                defaultValue = {ServicoId}/>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Quantidade</Label>
                            <Input name="quantidade" placeholder="quantidade" type="text"
                                value={quantidade}
                                onChange={ e=> setQuantidade(e.target.value)}/>
                        </FormGroup>

                        <Button type="submit" outline color="warning">Salvar</Button>
                        <Button type="reset" outline color="primary">Limpar</Button>
                    </Form>
            </Container>
        </div>
    )
}