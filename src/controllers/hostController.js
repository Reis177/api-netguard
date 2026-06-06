import  runNetworkAudit  from '../services/checkerService.js';
import Host from '../models/Host.js';

// Cadastra um novo host/servidor para ser monitorado
export const createHost = async (req, res) => {
  try {
    const { name, host, port } = req.body;
    if (!name || !host || !port) {
      return res.status(400).json({ error: 'Campos name, host e port são obrigatórios' });
    }
    const newHost = await Host.create({ name, host, port });
    res.status(201).json(newHost);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno ao cadastrar o host' });
  }
};

// Executa a varredura nas portas e retorna o relatório atualizado
export const getStatusReport = async (req, res) => {
  try {
    await runNetworkAudit();
    const reports = await Host.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar o relatório de conexões' });
  }
};

// Exporta o objeto padrão para o server.js ler corretamente
export default { createHost, getStatusReport };