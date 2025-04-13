/**
 * @swagger
 * tags:
 *   name: Order of Service
 *   description: Church service order management
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create new order of service
 *     tags: [Order of Service]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dateOfService
 *               - doxology
 *               - invocation
 *               - welcomeIntro
 *               - openingHymn
 *             properties:
 *               dateOfService:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-05-01T09:00:00Z"
 *               doxology:
 *                 type: string
 *               invocation:
 *                 type: string
 *               welcomeIntro:
 *                 type: string
 *               openingHymn:
 *                 type: string
 *               prayer:
 *                 type: string
 *               firstSpecialSong:
 *                 type: string
 *               scriptureReading:
 *                 type: string
 *               sermon:
 *                 type: string
 *               closingHymn:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order of service created
 *       400:
 *         description: Invalid input or date must be in future
 * 
 *   get:
 *     summary: Get all orders of service
 *     tags: [Order of Service]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search in sermon, scripture, and hymns
 *     responses:
 *       200:
 *         description: List of service orders
 * 
 * /order/{id}:
 *   get:
 *     summary: Get order of service by ID
 *     tags: [Order of Service]
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
 *         description: Order details
 *       404:
 *         description: Order not found
 * 
 *   put:
 *     summary: Update order of service
 *     tags: [Order of Service]
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
 *             $ref: '#/components/schemas/OrderUpdate'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid date (must be future)
 * 
 *   delete:
 *     summary: Delete order of service
 *     tags: [Order of Service]
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
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 * 
 * components:
 *   schemas:
 *     OrderUpdate:
 *       type: object
 *       properties:
 *         dateOfService:
 *           type: string
 *           format: date-time
 *         doxology:
 *           type: string
 *         invocation:
 *           type: string
 *         welcomeIntro:
 *           type: string
 *         openingHymn:
 *           type: string
 *         prayer:
 *           type: string
 *         firstSpecialSong:
 *           type: string
 *         scriptureReading:
 *           type: string
 *         sermon:
 *           type: string
 *         closingHymn:
 *           type: string
 */