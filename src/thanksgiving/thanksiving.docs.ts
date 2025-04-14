/**
 * @swagger
 * tags:
 *   name: Thanksgiving
 *   description: Thanksgiving offering management
 */

/**
 * @swagger
 * /thanksgiving:
 *   post:
 *     summary: Create new thanksgiving record
 *     tags: [Thanksgiving]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - purpose
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "John Doe"
 *               amount:
 *                 type: number
 *                 minimum: 1
 *                 example: 5000
 *               purpose:
 *                 type: string
 *                 example: "Birthday Thanksgiving"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-13T10:00:00Z"
 *     responses:
 *       201:
 *         description: Thanksgiving created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 * 
 *   get:
 *     summary: Get all thanksgiving records
 *     tags: [Thanksgiving]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by giver's name
 *     responses:
 *       200:
 *         description: List of thanksgiving records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Thanksgiving'
 * 
 * /thanksgiving/{id}:
 *   get:
 *     summary: Get thanksgiving by ID
 *     tags: [Thanksgiving]
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
 *         description: Thanksgiving details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Thanksgiving'
 *       404:
 *         description: Thanksgiving not found
 * 
 *   put:
 *     summary: Update thanksgiving record
 *     tags: [Thanksgiving]
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
 *             $ref: '#/components/schemas/ThanksgivingUpdate'
 *     responses:
 *       200:
 *         description: Thanksgiving updated successfully
 *       404:
 *         description: Thanksgiving not found
 * 
 *   delete:
 *     summary: Delete thanksgiving record
 *     tags: [Thanksgiving]
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
 *         description: Thanksgiving deleted successfully
 *       404:
 *         description: Thanksgiving not found
 * 
 * components:
 *   schemas:
 *     Thanksgiving:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         amount:
 *           type: number
 *         purpose:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     ThanksgivingUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         amount:
 *           type: number
 *         purpose:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 */