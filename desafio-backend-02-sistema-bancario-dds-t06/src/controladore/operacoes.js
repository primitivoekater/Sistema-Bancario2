let { banco, contas, ultimoID, saques, depositos, tranferencias } = require("../bancodedados")

const listarContas = (req, res) => {
    const(senha_banco) = req.query;
    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'A senha do banco é obrigatoria' });
    }
    if (senha_banco !== banco.senha) {
        return res.status(400).json({ mensagem: 'A senha do banco informada é invalida' });
    }
    return res.json(contas)
}
const cadastrarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: `um ou mais campos não foram preenchidos` })
    }
    const Cliente = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }
    const conta = {
        numero: numeroConta++,
        saldo: 0,
        usuario: Cliente
    }



    //verificação de cpf e emial falharam. não consegui concertar. eventualmente eu volto e arrumo antes do fim do curso
    const buscarCpf = contas.find((conta) => {
        return conta.cpf = Number(Cliente.cpf)
    })
    if (buscarCpf) {
        return res.status(404).json({ mensagem: `CPF Ja cadastrado` })
    }
    const buscarEmail = contas.find((cliente) => {
        return cliente.email = Cliente.email
    })
    if (buscarEmail) {
        return res.status(404).json({ mensagem: `Email Ja cadastrado` })
    }
    contas.push(conta)
    return res.status(201).json()
}

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: `um ou mais campos não foram preenchidos` })
    }

    const buscarConta = contas.find((conta) => {
        return conta.numeroConta = Number(numeroConta)
    })
    console.log(buscarConta)
    if (!buscarConta) {
        return res.status(404).json({ mensagem: `usuario não cadastrado` })
    } else

        buscarConta.nome = nome;
    buscarConta.cpf = cpf;
    buscarConta.data_nascimento = data_nascimento;
    buscarConta.telefone = telefone
    buscarConta.email = email;
    buscarConta.senha = senha;

    return res.status(203).send()
}

const atualizarUsuarioConta = (req, res) => {
    const { nome, email, cpf, data_nascimento, telefone, senha } = req.body;
    const { numeroConta } = req.params;

    if (!nome || !email || !cpf || !data_nascimento || !telefone || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatorios' });
    }

    const contaEncontrada = contas.find(conta => Number(conta.numero) === Number(numeroConta));
    if (!contaEncontrada) {
        return req.status(404).json({ mensagem: 'Conta inexistente' });
    }
    if (cpf !== contaEncontrada.usuario.cpf) {
        const existeCpf = contas.find(conta => conta.usuario.cpf === cpf);

        if (existeCpf) {
            return res.status(400).json({ mensagem: 'Cpf já existente cadastrado' });
        }
    }
    if (email !== contaEncontrada.usuario.email) {
        const existeEmail = contas.find(conta => conta.usuario.email === email);

        if (existeEmail) {
            return res.status(400).json({ mensagem: 'email já existente cadastrado' });
        }
    }
    contaEncontrada.usuario = { nome, email, cpf, data_nascimento, telefone, senha }
    return res.status(204).send();
}
const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const contaEncontrada = contas.find(conta => Number(conta, numero) === Number(numeroConta));
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'conta Inexistente' })
    }
    if (contaEncontrada.saldo > 0) {
        return res.status(404).json({ mensagem: 'Conta só pode ser excluida se o saldo for 0' });
    }

    contas = contas.filter(conta => Number(conta.numero) === Number(numeroConta));

    return res.status(204).send()
}



const extrato = (req, res) => {
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


    const extratoDepositos = depositos.filter(depoisto => Number(depositos.numero_conta) === Number(numeroConta));
    const extratoSaques = saques.filter(saques => Number(saques.numero_conta) === Number(numeroConta));
    const transferenciasEnviadas = tranferencias.filter(tranferencia => Number(tranferencias.numero_conta_origem) === Number(numeroConta));
    const transferenciasRecebidas = tranferencias.filter(tranferencia => Number(tranferencias.numero_conta_destino) === Number(numeroConta));

    return res.json(
        {
            depositos: extratoDepositos,
            saques: extratoSaques,
            transferenciasEnviadas,
            transferenciasRecebidas
        });
}
module.exports = {
    listarContas,
    cadastrarConta,
    atualizarUsuario,
    atualizarUsuarioConta,
    excluirConta,
    extrato

}



