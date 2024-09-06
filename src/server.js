const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');  
const musicRoutes = require('./routes/musicRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);  
app.use('/api/musics', musicRoutes);

// Rota de instalação
app.get('/install', async (req, res) => {
  try {
    const User = require('./models/User');
    const Song = require('./models/Songs'); 

    // Criar administrador padrão se não existir
    let adminUser = await User.findOne({ email: 'admin@biblioteca.com' });
    if (!adminUser) {
      adminUser = new User({
        name: 'Admin',
        email: 'adminPadrao@biblioteca.com',
        password: 'admin123', 
        role: 'admin',
      });
      await adminUser.save();
    }

    // Adicionar 5 músicas exemplo
    const songsCount = await Song.countDocuments();
    if (songsCount === 0) {
      const songs = [
        { title: 'É Ele', artist: 'Drops INA', album: 'É Ele', genre: 'Gospel', duration: 210, year: 2020 },
        { title: 'Sua mae vai me amar', artist: 'Turma do pagode', album: 'Single', genre: 'Pagode', duration: 180, year: 2019 },
        { title: 'To bem', artist: 'Dionisio', album: 'Single', genre: 'Pop', duration: 240, year: 2021 },
        { title: 'Aquariano Nato', artist: 'Mc Saci', album: 'Single', genre: 'funk', duration: 200, year: 2018 },
        { title: 'Confissioes PT2', artist: 'Veigh', album: 'Magic Show', genre: 'Trap', duration: 190, year: 2022 },
      ];
      await Song.insertMany(songs);
    }

    res.status(200).json({ msg: 'Instalação concluída com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro na instalação', error: err.message });
  }
});

// Configuração do Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
