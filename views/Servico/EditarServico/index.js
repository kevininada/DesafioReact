import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const EditarServico = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const editServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };
        await axios.put(api + "/servico/" + id,
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
        const getServico = async () => {
            await axios(api + "/servico/" + id)
                .then((response) => {
                    setId(response.data.servico.id);
                    setNome(response.data.servico.nome);
                    setDescricao(response.data.servico.descricao);
                })
                .catch(() => {
                    console.log("Erro: não foi se conectar com a API.")
                })
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-servico"
                            className="m-auto btn btn-outline-primary btn-sm">Serviços</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === 'error' ? <Alert color="danger">
                        {status.message}</Alert> : " "}
                    {status.type === 'success' ? <Alert color="success">
                        {status.message}</Alert> : " "}
                    </div>
                    <Form className="p-2" onSubmit={editServico}>
                        <FormGroup className="p-2">
                            <Label>ID do Serviço</Label>
                            <Input name="id" placeholder="ID do serviço" type="text"
                                defaultValue= {id}/>
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Nome do Serviço</Label>
                            <Input name="nome" placeholder="nome do serviço" type="text"
                                value = {nome}
                                onChange={e => setNome(e.target.value)} />
                        </FormGroup>

                        <FormGroup className="p-2">
                            <Label>Descrição do Serviço</Label>
                            <Input name="descricao" placeholder="Descrição do serviço" type="text"
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