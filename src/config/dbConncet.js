import mongoose from 'mongoose';
import dns from 'dns';

// Força o Node.js a usar os servidores DNS do Google para resolver os links do Atlas
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

async function connectDB() {
    try {
        console.log("🔄 Tentando conectar ao MongoDB Atlas (Via Google DNS)...");
        
        // Conexão limpa e padrão
        await mongoose.connect(process.env.MONGODB_URI); 
        
        console.log("✅ Conectado ao MongoDB com sucesso!");
    } catch (error) {
        console.error("Erro de conexão com o MongoDB Atlas:", error);
        process.exit(1);
    }
}

export default connectDB;