import {Router} from 'express'
// import { index} from '../controllers/socket.js'
import { index, createQr,allQrs,editQr,viewsTo0 } from '../controllers/qr.js';
const router =Router()

router.get('/qr/all',allQrs)
router.get('/qr',index)
router.post('/qr', createQr)
router.put('/qr',editQr)
router.put('/qr/0', viewsTo0 )

export default router;