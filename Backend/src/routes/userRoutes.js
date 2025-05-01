// import React from 'react';
  
//   const UserRoutes = () =>  {
// 	return (
// 	  <div>
// 	  </div>
// 	);
//   }
  
//   export default UserRoutes;
  // import React from 'react';
  
//   const UserRoutes = () =>  {
// 	return (
// 	  <div>
// 	  </div>
// 	);
//   }
  
//   export default UserRoutes;
import express from 'express';
import {getAllUsers, createUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/get-user',getAllUsers);
router.post('/create-user', createUser);

export default router;