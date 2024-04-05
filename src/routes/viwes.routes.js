import {Router} from 'express'
import { index} from '../controllers/socket.js'
const router =Router()

router.get('/index/:qrId',index)

export default router;