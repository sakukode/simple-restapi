import express from 'express'
//tambahkan baris kode ini untuk import models
const models = require('../models/index');

const router = express.Router();


/**
 * Route untuk mengambil semua data artikel
 */
router.get('/', async function(req, res, next) {
	try {
		//mengambil semua data
		const posts = await models.posts.findAll({});

		if (posts.length !== 0) {
			res.json({
				'status': 'OK',
				'messages': '',
				'data': posts
			});
		} else {
			res.json({
				'status': 'EMPTY',
				'messages': 'Data is empty',
				'data': {} 
			});
		}
	} catch (err) {
		res.status(500).json({
			'status': 'ERROR',
			'messages': 'Internal Server Error'
		})
	}
});

/**
 * Route untuk mengambil artikel berdasarkan ID
 */
router.get('/:id', async function(req, res, next) {
	try {			
		//mengangkap param ID
		const id = req.params.id;
		const post = await models.posts.findByPk(id);		

		if (post) {
			res.json({
				'status': 'OK',
				'messages': '',
				'data': post
			});
		} else {
			res.status(404).json({
				'status': 'NOT_FOUND',
				'messages': 'Data not found',
				'data': null 
			});
		}
	} catch (err) {		
		res.status(500).json({
			'status': 'ERROR',
			'messages': 'Internal Server Error'
		})
	}
});

/**
 * Route untuk membuat artikel baru
 */
router.post('/', function(req, res, next) {
	  
});

/**
 * Route untuk mengupdate artikel berdasarkan ID
 */
router.put('/:id', function(req, res, next) {
	  
});

/**
 * Route untuk menghapus artikel berdasarkan ID
 */
router.delete('/:id', function(req, res, next) {
	  
});

export default router;