const Song = require("../models/Songs");


exports.addMusic = async (req, res) => {
  try {
    const userId = req.user.id; // Obtém o ID do usuário autenticado
    const song = new Song({ ...req.body, userId }); // Inclui o userId ao criar a música

    await song.save();

    res.status(201).json({ msg: "Música adicionada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar músicas com paginação
exports.listMusics = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const songs = await Song.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalSongs = await Song.countDocuments();
    const totalPages = Math.ceil(totalSongs / limit);

    res.json({
      songs,
      totalPages,
      currentPage: page,
      totalSongs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter detalhes de uma música
exports.getMusic = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ msg: "Música não encontrada" });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar uma música
exports.updateMusic = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) return res.status(404).json({ msg: "Música não encontrada" });
    res.json({ msg: "Música atualizada com sucesso", song });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma música
exports.deleteMusic = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ msg: "Música não encontrada" });
    res.json({ msg: "Música excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Listar músicas do usuário logado
exports.listUserMusics = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const userId = req.user.id; 

    const songs = await Song.find({ userId })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalSongs = await Song.countDocuments({ userId });
    const totalPages = Math.ceil(totalSongs / limit);

    res.json({
      songs,
      totalPages,
      currentPage: page,
      totalSongs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};