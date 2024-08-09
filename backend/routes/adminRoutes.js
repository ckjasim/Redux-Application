import express from 'express';
import {
  authAdmin,
  logoutAdmin,
  viewUser,
  userData,
  createUser,
  updateUser,
  deleteUser

} from '../controller/adminController.js';

const router = express.Router();

router.post('/login', authAdmin);
router.post('/logout', logoutAdmin);
router.get('/home', viewUser); 
router.get('/userData/:id', userData); 
router.put('/updateUser', updateUser); 
router.post('/deleteUser/:id', deleteUser); 
router.post('/createUser', createUser); 



export default router;
