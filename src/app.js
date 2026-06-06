import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import dns from 'dns';
import hostController from './controllers/hostController.js';
import connectDB from './config/dbConncet.js'; // Atenção ao .js no final
import runNetworkAudit from './services/checkerService.js';

const db = await connectDB(); // Conecta ao MongoDB Atlas antes de iniciar o servidor
// db.once('open', () => console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!'));
// db.on('error', (error) => console.error('Erro de conexão com o MongoDB Atlas:', error));

// Força o Node a resolver em IPv4 primeiro para evitar problemas de DNS
dns.setDefaultResultOrder('ipv4first');

const app = express();
app.use(express.json());


// const MONGO_URI = ""; // <-- COLOQUE SUA URL DO ATLAS AQUI

mongoose.set('strictQuery', true);

console.log('🔄 Tentando conectar ao MongoDB Atlas...');

// try {
//   // No ES Modules, o top-level await é liberado de fábrica!
//   await mongoose.connect(MONGO_URI, {
//     serverSelectionTimeoutMS: 5000,
//     socketTimeoutMS: 45000,
//   });
//   console.log('🍃 [SUCESSO] Conectado com sucesso ao MongoDB Atlas!');
// } catch (error) {
//   console.log('❌ Ocorreu um erro de rede ou de credenciais ao conectar ao banco:');
//   console.error(error.message);
// }

// Rotas da API REST
app.post('/api/hosts', hostController.createHost);
app.get('/api/hosts/report', hostController.getStatusReport);

export default app;