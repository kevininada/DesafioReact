import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const EditarProduto = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editProduto = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.put(api + "/produto/" + id,
            { id, nome, descricao }, { headers })
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
        const getProduto = async () => {
            await axios(api + "/produto/" + id)
                .then((response) => {
                    setId(response.data.produto.id);
                    setNome(response.data.produto.nome);
                    setDescricao(response.data.produto.descricao);
                })
                .catch(() => {
                    console.log("Erro: não foi se conectar com a API.")
                })
        }
        getProduto();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Produto</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-produto"
                            className="m-auto btn btn-outline-primary btn-sm">Produtos</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                    </div>
                    <Form className="p-2" onSubmit={editProduto}>
                        <FormGroup className="p-2">
                            <Label>ID do Produto</Label>
                            <Input name="id" placeholder="ID do produto" type="text"
                                defaultValue= {id}/>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Nome do Produto</Label>
                            <Input name="nome" placeholder="nome do produto" type="text"
                                value = {nome}
                                onChange={e => setNome(e.target.value)} />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Descrição do Produto</Label>
                            <Input name="descricao" placeholder="Descrição do produto" type="text"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}/>
                        </FormGroup>

                        <Button type="submit" outline color="warning">Salvar</Button>
                        <Button type="reset" outline color="primary">Limpar</Button>
                    </Form>
            </Container>
        </div>
    )
}