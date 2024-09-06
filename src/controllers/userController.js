const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Registrar um novo usuário
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Usuário já existe' });

    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Senha inválida' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar dados do usuário
exports.update = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar um novo administrador
exports.createAdmin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    user.role = 'admin';
    await user.save();
    res.json({ msg: 'Administrador criado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um usuário
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar se o usuário autenticado é um admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Acesso negado: Apenas administradores podem excluir usuários' });
    }

    // Excluir o usuário
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });
    res.json({ msg: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Listar usuários com paginação
exports.listUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; 
        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            users,
            totalPages,
            currentPage: page,
            totalUsers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};