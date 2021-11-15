const express = require('express');
const cors = require('cors');
const { Sequelize, sequelize } = require('./models');
const models = require('./models');
const app = express();

app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let compra = models.Compra;
let produto = models.Produto;
let itemcompra = models.ItemCompra;

app.get('/', function (req, res) {
    res.send('Olá, Mundo!')
});

app.post('/clientes', async (req, res) => {
    await cliente.create(
        req.body
    ).then(cli => {
        return res.json({
            error: false,
            message: "Cliente foi cadastrado com sucesso!",
            cli
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o cliente."
        });
    });
});

app.post('/cliente/:id/pedido', async (req, res) => {
    const ped = {
        data: req.body.data,
        ClienteId: req.params.id
    };

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await pedido.create(ped)
        .then(order => {
            return res.json({
                error: false,
                message: "pedido foi inserido com sucesso.",
                order
            });
        }).catch(erro => {
            return res.json({
                error: true,
                message: "Não foi possível inserir o pedido."
            });
        });
});

app.get('/clientes', async (req, res) => {
    await cliente.findAll({ include: [{ all: true }] })
        .then(cli => {
            return res.json({
                error: false,
                cli
            });
        }).catch(erro => {
            return res.json({
                error: true,
                message: "Não foi possível retornar nenhum cliente."
            });
        });
});

app.get('/clientes-pedidos', async (req, res) => {
    await cliente.findAll({ include: [{ all: true }] })
        .then(cli => {
            return res.json({
                error: false,
                cli
            });
        })
        .catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro de conexão."
            });
        });
});

app.get('/cliente/:id/pedidos', async (req, res) => {
    await pedido.findAll({
        where: { ClienteId: req.params.id }
    }).then(pedidos => {
        return res.json({
            error: false,
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Não foi possível retornar pedidos."
        });
    });
});

app.get('/pedido/:id', async(req, res)=>{
    pedido.findByPk(req.params.id)
    .then(pedido =>{
        return res.json({
            error: false,
            pedido
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível acessar a API."
        });
    });
});

//alterar o pedido com base no id do pedido
app.put('/pedido/:id', async(req, res)=>{
    const ped = {
        id: req.params.id,
        data: req.body.data,
        ClienteId: req.body.ClienteId
    };

    if (!await cliente.findByPk(req.body.ClienteId)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await pedido.update(ped, {
        where: sequelize.and(
            { ClienteId: req.body.ClienteId },
            { id: req.params.id }
        )
    }).then(pedidos => {
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso.",
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Nao foi possível alterar."
        });
    });
});


//alterar os dados do pedido
app.put('/cliente/:id/pedido', async (req, res) => {
    const ped = {
        data: req.body.data,
        ClienteId: req.params.id
    };

    if (!await cliente.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await pedido.update(ped, {
        where: sequelize.and(
            { ClienteId: req.params.id },
            { id: req.body.id }
        )
    }).then(pedidos => {
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso.",
            pedidos
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Nao foi possível alterar o pedido."
        });
    });
});

//em cima tudo ok!

app.post('/servicos', async (req, res) => {
    await servico.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Serviço cadastrado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        })
    });
});

app.post('/pedidos', async (req, res) => {
    await pedido.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Pedido cadastrado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        })
    });
});

app.post('/itempedidos', async (req, res) => {
    await itempedido.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        })
    });
});

app.post('/compras', async (req, res) => {
    await compra.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Compra cadastrada com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        })
    });
});

app.post('/produtos', async (req, res) => {
    await produto.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Produto cadastrado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        })
    });
});

app.post('/itemcompras', async (req, res) => {
    await itemcompra.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        })
    });
});

app.get('/listaclientes', async (req, res) => {
    await cliente.findAll({
        raw: true
    }).then(function (clientes) {
        res.json({ clientes })
    });
});

app.get('/listaservicos', async (req, res) => {
    await servico.findAll({
        //raw: true
        order: [['nome', 'ASC']]
    }).then(function (servicos) {
        res.json({ servicos })
    });
});

app.get('/listapedidos', async (req, res) => {
    await pedido.findAll({
        raw: true
    }).then(function (pedidos) {
        res.json({ pedidos })
    });
});

app.get('/listaitempedidos', async (req, res) => {
    await itempedido.findAll({
        raw: true
    }).then(function (itempedidos) {
        res.json({ itempedidos })
    });
});

app.get('/ofertaservicos', async (req, res) => {
    await servico.count('id').then(function (servicos) {
        res.json({ servicos });
    });
});

app.get('/listaprodutos', async (req, res) => {
    await produto.findAll({
        raw: true
    }).then(function (produtos) {
        res.json({ produtos })
    });
});

app.get('/listacompras', async (req, res) => {
    await compra.findAll({
        raw: true
    }).then(function (compras) {
        res.json({ compras })
    });
});

app.get('/listaitemcompras', async (req, res) => {
    await compra.findAll({
        raw: true
    }).then(function (itemcompras) {
        res.json({ itemcompras })
    });
});

app.get('/servico/:id/pedidos', async (req, res) => {
    await itempedido.findAll({
        where: { ServicoId: req.params.id }
    })
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi possível conectar!"
            });
        });
});

app.put('/atualizaservico', async (req, res) => {
    await servico.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

app.get('/pedidos/:id', async (req, res) => {
    await pedido.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        });
});

app.put('/pedidos/:id/editaritem', async (req, res) => {
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado.'
        });
    };

    if (!await servico.findByPk(req.body.ServicoId)) {
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ ServicoId: req.body.ServicoId },
            { PedidoId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso!",
            itens
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.delete('excluir-cliente/:id', async (req, res) => {
    await cliente.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Cliente foi excluído com sucesso!"
        });
    }).catch(erro=> {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente."
        });
    });
});


app.get('/compras/:id', async (req, res) => {
    await compra.findByPk(req.params.id, { include: [{ all: true }] })
        .then(comp => {
            return res.json({ comp });
        });
});

app.put('/compras/:id/editaritem', async (req, res) => {
    const item = {
        data: req.body.data,
    };

    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: "A compra não foi encontrada."
        });
    };

    if (!await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: "Produto não encontrado."
        });
    };

    await itemcompra.update(item, {
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { CompraId: req.params.id })
    }).then(function (itens) {
        return res.json({
            error: false,
            message: "A compra foi alterada com sucesso!",
            itens
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.get('excluircompra/:id', async (req, res) => {
    await compra.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "A compra foi excluída com sucesso!"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir a compra."
        });
    });
});

app.get('excluirproduto/:id', async (req, res) => {
    await produto.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "O produto foi excluído com sucesso!"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o produto."
        });
    });
});


let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Sevidor ativo: http://localhost:3001');
})