const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const authMiddleware = require('../middlewares/authMiddleware'); // Remova a linha duplicada

/**
 * @swagger
 * tags:
 *   name: Musics
 *   description: Operações relacionadas a músicas
 */

/**
 * @swagger
 * /api/musics:
 *   post:
 *     summary: Adiciona uma nova música
 *     tags: [Musics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               album:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: number
 *               year:
 *                 type: number
 *     responses:
 *       201:
 *         description: Música adicionada com sucesso
 *       500:
 *         description: Erro no servidor
 */
router.post('/', authMiddleware, musicController.addMusic);

/**
 * @swagger
 * /api/musics:
 *   get:
 *     summary: Lista todas as músicas
 *     tags: [Musics]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Página para paginação
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Limite de itens por página
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de músicas
 *       500:
 *         description: Erro no servidor
 */
router.get('/', authMiddleware, musicController.listMusics);

/**
 * @swagger
 * /api/musics/minhas-musicas:
 *   get:
 *     summary: Lista as músicas do usuário logado
 *     tags: [Musics]
 *     responses:
 *       200:
 *         description: Lista de músicas do usuário
 *       404:
 *         description: Nenhuma música encontrada
 *       500:
 *         description: Erro no servidor
 */
router.get('/minhas-musicas', authMiddleware, musicController.listUserMusics);

/**
 * @swagger
 * /api/musics/{id}:
 *   get:
 *     summary: Obtém detalhes de uma música
 *     tags: [Musics]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da música
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes da música
 *       404:
 *         description: Música não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', authMiddleware, musicController.getMusic);

/**
 * @swagger
 * /api/musics/{id}:
 *   put:
 *     summary: Atualiza uma música
 *     tags: [Musics]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da música
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               album:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: number
 *               year:
 *                 type: number
 *     responses:
 *       200:
 *         description: Música atualizada com sucesso
 *       404:
 *         description: Música não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.put('/:id', authMiddleware, musicController.updateMusic);

/**
 * @swagger
 * /api/musics/{id}:
 *   delete:
 *     summary: Exclui uma música
 *     tags: [Musics]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da música
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Música excluída com sucesso
 *       404:
 *         description: Música não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', authMiddleware, musicController.deleteMusic);

module.exports = router;