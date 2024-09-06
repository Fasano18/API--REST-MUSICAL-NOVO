const User = require('../models/User');
require('dotenv').config();

// Criar um novo administrador
exports.createAdmin = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Acesso negado: Apenas administradores podem criar outros administradores' });
  }

  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, role: 'admin' });
      await user.save();
      return res.status(201).json({ msg: 'Administrador criado com sucesso' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ msg: 'Este usuário já é um administrador' });
    }

    user.role = 'admin';
    await user.save();
    res.json({ msg: 'Usuário promovido a administrador com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um usuário
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Acesso negado' });

    await User.findByIdAndDelete(id);
    res.json({ msg: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar qualquer usuário (admin)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Acesso negado: Apenas administradores podem editar outros usuários' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    res.json({ msg: 'Usuário atualizado com sucesso', updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
