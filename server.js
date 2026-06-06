import dotenv from 'dotenv';
import app from './src/app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🌐 NetGuard API ativa localmente na porta ${PORT}`);
});