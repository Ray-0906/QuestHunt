const express=require('express');
const { getTrackerQuestSet,handleGetCurrentUser,getMission, allUsers } = require('../Controller/info');

const router=express.Router();
router.get('/rankings',allUsers);
router.post('/quests',getTrackerQuestSet);
router.post('/mission',getMission);
router.post('/me',handleGetCurrentUser);
module.exports=router;