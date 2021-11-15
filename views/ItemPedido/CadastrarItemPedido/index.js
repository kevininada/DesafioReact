import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";


export const CadastrarItemPedido = () => {

    const [itemP, setItemPedido] = useState({
        PedidoId: '',
        ServicoId: '',
        quantidade: '',
        valor: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemPedido({
        ...itemP, [e.target.name]: e.target.value
    });

    const cadItemPedido = async e => {
        e.preventDefault();
        console.log(itemP);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/itempedidos", itemP, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    });
                };
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API.")
            });
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Item do Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-itempedido"
                        className="btn btn-outline-success btn-sm">Item do Pedido</Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert>: ""}

            <Form className="p-2" onSubmit={cadItemPedido}>
                <FormGroup className="p-2">
                    <Label>Pedido ID</Label>
                    <Input name="PedidoId" placeholder="ID do Pedido" type="text"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Serviço ID</Label>
                    <Input name="ServicoId" placeholder="ID do Serviço" type="text"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input name="quantidade" placeholder="Quantidade de serviços" type="text"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input name="valor" placeholder="Valor do Serviço" type="text"
                        onChange={valorInput} />
                </FormGroup>

                <Button type="submit" outline color="success">Cadastrar</Button>
                <Button type="reset" outline color="primary">Limpar</Button>
            </Form>
        </Container>

    );
};