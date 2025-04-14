/**
 * @swagger
 * tags:
 *   name: Transfers
 *   description: Church membership transfer management
 */

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Create new transfer request
 *     tags: [Transfers]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberName
 *               - churchFrom
 *               - churchTo
 *               - dateOfBirth
 *               - dateOfBaptism
 *               - baptizedBy
 *               - parentsName
 *             properties:
 *               memberName:
 *                 type: string
 *                 minLength: 3
 *                 example: "John Doe"
 *               churchFrom:
 *                 type: string
 *                 minLength: 3
 *                 example: "CAC Akure"
 *               churchTo:
 *                 type: string
 *                 minLength: 3
 *                 example: "CAC Lagos"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               dateOfBaptism:
 *                 type: string
 *                 format: date
 *                 example: "2010-01-01"
 *               baptizedBy:
 *                 type: string
 *                 example: "Pastor John Smith"
 *               parentsName:
 *                 type: string
 *                 example: "Mr & Mrs Doe"
 *     responses:
 *       201:
 *         description: Transfer request created successfully
 *       400:
 *         description: Birth and baptism dates are required
 * 
 *   get:
 *     summary: Get all transfers
 *     tags: [Transfers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: memberName
 *         schema:
 *           type: string
 *         description: Filter by member name
 *       - in: query
 *         name: churchFrom
 *         schema:
 *           type: string
 *         description: Filter by source church
 *       - in: query
 *         name: churchTo
 *         schema:
 *           type: string
 *         description: Filter by destination church
 *     responses:
 *       200:
 *         description: List of transfers
 * 
 * /transfer/{id}:
 *   get:
 *     summary: Get transfer by ID
 *     tags: [Transfers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transfer details
 *       404:
 *         description: Transfer not found
 * 
 *   put:
 *     summary: Update transfer
 *     tags: [Transfers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferUpdate'
 *     responses:
 *       200:
 *         description: Transfer updated successfully
 *       404:
 *         description: Transfer not found
 * 
 *   delete:
 *     summary: Delete transfer
 *     tags: [Transfers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transfer deleted successfully
 *       404:
 *         description: Transfer not found
 * 
 * /transfer/{id}/advance:
 *   post:
 *     summary: Advance transfer stage
 *     tags: [Transfers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transfer stage advanced successfully
 *       404:
 *         description: Transfer not found
 * 
 * /transfer/{id}/reject:
 *   post:
 *     summary: Reject transfer
 *     tags: [Transfers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transfer rejected successfully
 *       404:
 *         description: Transfer not found
 * 
 * components:
 *   schemas:
 *     TransferUpdate:
 *       type: object
 *       properties:
 *         memberName:
 *           type: string
 *         churchFrom:
 *           type: string
 *         churchTo:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         dateOfBaptism:
 *           type: string
 *           format: date
 *         baptizedBy:
 *           type: string
 *         parentsName:
 *           type: string
 */