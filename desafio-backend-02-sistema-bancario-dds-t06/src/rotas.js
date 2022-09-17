const express = require('express')
const operacoes = require('./controladore/operacoes')
const rotas = express()
const transacoes = require('./controladores/transacoes')

rotas.get('/operacoes', operacoes.listarContas)
rotas.post('/operacoess', operacoes.cadastrarConta)
rotas.put('/operacoes/:numeroConta/usuario', operacoes.atualizarUsuario)
rotas.delete('/operacoes/:numeroConta', operacoes.excluirConta)

rotas.get('/contas/extrato', operacoes.extrato)


rotas.post('/transacoes/depositar', transacoes.depositar)
rotas.post('/transacoes/sacar', transacoes.sacar)
rotas.post('/transacoes/transferir', transacoes.tranferir)
rotas.get('/transacoes/saldo', operacoes.saldo)


module.exports = rotas 