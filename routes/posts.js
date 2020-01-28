import express from 'express'

const router = express.Router();

/**
 * Route untuk mengambil semua data artikel
 */
router.get('/', function(req, res, next) {
	res.send('router posts');
});

/**
 * Route untuk mengambil artikel berdasarkan ID
 */
router.get('/:id', function(req, res, next) {
	
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