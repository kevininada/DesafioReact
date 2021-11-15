import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const EditarItemCompra = (props) => {

    const [CompraId, setCompraId] = useState(''); 
    const [ProdutoId, setProdutoId] = useState('');
    const [valor, setValor] = useState('');   
    const [quantidade, setQuantidade] =  useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editItemCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.put(api + "/itemcompra/",
            { CompraId, ProdutoId, quantidade, valor }, { headers })
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
        const getItemCompra = async () => {
            await axios(api + "/itemcompra/")
                .then((response) => {
                    setCompraId(response.data.itemcompra.CompraId);
                    setProdutoId(response.data.itemcompra.ProdutoId);
                    setQuantidade(response.data.itemcompra.quantidade);
                    setValor(response.data.itemcompra.valor);
                })
                .catch(() => {
                    console.log("Erro: não foi se conectar com a API.")
                })
        }
        getItemCompra();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Item da Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-compra"
                            className="m-auto btn btn-outline-primary btn-sm">Compras</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                    </div>
                    <Form className="p-2" onSubmit={editItemCompra}>
                        <FormGroup className="p-2">
                            <Label>ID da Compra</Label>
                            <Input name="CompraId" placeholder="ID da compra" type="text"
                                defaultValue= {CompraId}/>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>ID do Produto</Label>
                            <Input name="ProdutoId" placeholder="ID do produto" type="text"
                                defaultValue = {ProdutoId}/>
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