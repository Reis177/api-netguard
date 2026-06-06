import net from 'net';
import Host from '../models/Host.js';

/**
 * Tenta abrir uma conexão TCP com o host e porta especificados
 */
const checkConnection = (host, port, timeout = 5000) => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const socket = new net.Socket();

    socket.setTimeout(timeout);

    socket.connect(port, host, () => {
      const latency = Date.now() - startTime;
      socket.destroy();
      resolve({ success: true, latency });
    });

    socket.on('error', (err) => {
      socket.destroy();
      resolve({ success: false, error: err.message });
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve({ success: false, error: 'Timeout de conexão (Possível bloqueio de Firewall)' });
    });
  });
};

/**
 * Percorre todos os hosts cadastrados, testa as portas e atualiza no banco
 */
const runNetworkAudit = async () => { 
  const hosts = await Host.find();
  
  for (const item of hosts) {
    const result = await checkConnection(item.host, item.port);
    
    item.lastChecked = new Date();
    if (result.success) {
      item.status = 'ONLINE';
      item.latencyMs = result.latency;
      item.errorMessage = null;
    } else {
      item.status = 'OFFLINE';
      item.latencyMs = 0;
      item.errorMessage = result.error;
    }
    
    await item.save();
  }
};

export default runNetworkAudit;