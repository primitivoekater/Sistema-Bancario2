let { contas, saques, depositos, tansferencias } = require("../bancodedados")


const sacar = (req, res) => {
    const { numero, conta, valor, senha } = req.body;

    if (!numero || !conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O  numero da conta, a senha,  e valor são obrigatorios ' });

    }

    const contaEncontrada = contas.find(conta => Number(conta.numero) === Number(numero.conta));

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "senha invalida  " })
    }


    if (contaEncontrada.saldo < valor) {
        return res.status(403).json({ mensagem: 'Saldo insuficiente ' });
    }
    contaEncontrada.saldo -= valor;

    const registro = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor:
    }
    saques.push(registro);

    return res.status(201).send();
}
const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O  numero da conta e valor são obrigatorios ' });

    }

    const contaEncontrada = contas.find(contas => Number(conta.numero) === Number(numero.conta));

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'o valor não pode ser menor ou igual a zero' });
    }
    contaEncontrada.saldo += valor;

    const registro = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    }
    depositos.push(registro);

    return res.status(201).send();
}
const transferir = (req, res) => {

    const sacar = (req, res) => {
        const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

        if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
            return res.status(400).json({ mensagem: 'O  numero da conta de origem, de detino, a senha,  e valor são obrigatorios ' });

        }

        const contaEncontradaOrigem = contas.find(contas => Number(conta.numero) === Number(numero_conta_origem));

        if (!contaEncontradaOrigem) {
            return res.status(404).json({ mensagem: 'Conta não encontrada' });
        }
        const contaEncontradaDestino = contas.find(contas => Number(conta.numero) === Number(numero_conta_destino));

        if (!contaEncontradaDestino) {
            return res.status(404).json({ mensagem: 'Conta não encontrada' });
        }
        if (contaEncontrada.usuario.senha !== senha) {
            return res.status(400).json({ mensagem: "senha invalida  " })
        }
        if (contaEncontradaOrigem.saldo < valor) {
            return res.status(403).json({ mensagem: 'Saldo insuficiente ' });
        }
        contaEncontradaOrigem.saldo -= valor;
        contaEncontradaDestino.saldo += valor

        const registro = {
            data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            numero_conta_origem,
            numero_conta_destino,
            valor
        }
        transferencias.push(registro);

        return res.status(201).send();

    }

    const saldo = (req, res) => {
        const { numero_conta, senha } = req.query

        if (!numero_conta || !valor) {
            return res.status(400).json({ mensagem: 'O  numero da conta e valor são obrigatorios ' });
        }
        const contaEncontrada = contas.find(conta => Number(conta.numero) === Number(numeroConta));
        if (!contaEncontrada) {
            return req.status(404).json({ mensagem: 'Conta inexistente' });
        }
        if (contaEncontrada.usuario.senha !== senha) {
            return res.status(404).json({ mensagem: "senha invalida" })
        }
        return res.json({ saldo: contaEnconrada.saldo })
    }

    module.exports = {
        depositar,
        sacar,
        transferir,
        saldo
    }
}