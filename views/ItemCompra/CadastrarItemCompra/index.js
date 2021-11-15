import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";


export const CadastrarItemCompra = () => {

    const [itemC, setItemCompra] = useState({
        CompraId: '',
        ProdutoId: '',
        quantidade: '',
        valor: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemCompra({
        ...itemC, [e.target.name]: e.target.value
    });

    const cadItemCompra = async e => {
        e.preventDefault();
        console.log(itemC);

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/itemcompras", itemC, { headers })
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
                    <h1>Cadastrar Item Da Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-itemcompra"
                        className="btn btn-outline-success btn-sm">Item da Compra</Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert>: ""}

            <Form className="p-2" onSubmit={cadItemCompra}>
                <FormGroup className="p-2">
                    <Label>Compra ID</Label>
                    <Input name="CompraId" placeholder="ID da compra" type="text"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Produto ID</Label>
                    <Input name="ProdutoId" placeholder="ID do produto" type="text"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input name="quantidade" placeholder="Quantidade de produto" type="text"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input name="valor" placeholder="Valor do produto" type="text"
                        onChange={valorInput} />
                </FormGroup>

                <Button type="submit" outline color="success">Cadastrar</Button>
                <Button type="reset" outline color="primary">Limpar</Button>
            </Form>
        </Container>

    );
};