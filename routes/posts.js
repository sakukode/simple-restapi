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
		//menangkap param ID
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
router.post('/', async function(req, res, next) {
  try {
    //menangkap form data yang dikirim melalu request body
    const {
      title,
      content,
      tags,
      published
    } = req.body;
    //membuat data baru di db menggunakan method create
    const post = await models.posts.create({
      title,
      content,
      tags,
      published
    });
    //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
    if (post) {
      res.status(201).json({
        'status': 'OK',
        'messages': 'Post berhasil ditambahkan',
        'data': post
      })
    }
  } catch(err) {  	
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message
    })
  }
});

/**
 * Route untuk mengupdate artikel berdasarkan ID
 */
router.put('/:id', async function(req, res, next) {
  try {
  	const id = req.params.id
    const {
    	title,
    	content,
    	tags,
    	published
    } = req.body

    const post = await models.posts.update({
    	title,
    	content,
    	tags,
    	published
    }, {
    	where: {
    		id: id
    	}
    })

    if (post) {
    	res.json({
    		'status': 'OK',
    		'messages': 'Post Berhasil diubah',    		
    	})
    }

  } catch(err) {
    res.status(400).json({
    	'status': 'ERROR',
    	'messages': err.message
    })
  }
});

/**
 * Route untuk menghapus artikel berdasarkan ID
 */
router.delete('/:id', async function(req, res, next) {
  try {
    const id = req.params.id 
    const post = await models.posts.destroy({
      where: {
        id: id
      }
    })

    if (post) {
      res.json({
        'status': 'OK',
        'messages': 'Post berhasil dihapus'
      })
    }
  } catch(err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message
    })
  }
});

export default router;