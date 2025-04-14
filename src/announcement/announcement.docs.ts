/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Church announcement management
 */

/**
 * @swagger
 * /announcement:
 *   post:
 *     summary: Create a new announcement
 *     tags: [Announcements]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - typeOfAnnouncement
 *               - dateOfAnnouncement
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Sunday Service Schedule Change"
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 1000
 *                 example: "Service time has been changed to 9:00 AM"
 *               typeOfAnnouncement:
 *                 type: string
 *                 enum: [District, Local, Zonal]
 *                 example: "Local"
 *               dateOfAnnouncement:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-20T09:00:00Z"
 *               is_recurring:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 * 
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcements]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: typeOfAnnouncement
 *         schema:
 *           type: string
 *           enum: [District, Local, Zonal]
 *     responses:
 *       200:
 *         description: List of announcements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Announcement'
 * 
 * /announcement/{id}:
 *   get:
 *     summary: Get announcement by ID
 *     tags: [Announcements]
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
 *         description: Announcement details
 *       404:
 *         description: Announcement not found
 * 
 *   put:
 *     summary: Update announcement
 *     tags: [Announcements]
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               typeOfAnnouncement:
 *                 type: string
 *                 enum: [District, Local, Zonal]
 *               dateOfAnnouncement:
 *                 type: string
 *                 format: date-time
 *               is_recurring:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *       404:
 *         description: Announcement not found
 * 
 *   delete:
 *     summary: Delete announcement
 *     tags: [Announcements]
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
 *         description: Announcement deleted successfully
 *       404:
 *         description: Announcement not found
 * 
 * components:
 *   schemas:
 *     Announcement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         typeOfAnnouncement:
 *           type: string
 *           enum: [District, Local, Zonal]
 *         dateOfAnnouncement:
 *           type: string
 *           format: date-time
 *         is_recurring:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */