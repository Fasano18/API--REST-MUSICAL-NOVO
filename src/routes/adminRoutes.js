const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Operações administrativas
 */

/**
 * @swagger
 * /api/admins/create:
 *   post:
 *     summary: Cria um novo administrador
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *       500:
 *         description: Erro no servidor
 */
router.post('/create', authMiddleware, adminController.createAdmin);

/**
 * @swagger
 * /api/admins/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     tags: [Admins]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', authMiddleware, adminController.deleteUser);

/**
 * @swagger
 * /api/admins/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Admins]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/:id', authMiddleware, adminController.updateUser);

module.exports = router;
