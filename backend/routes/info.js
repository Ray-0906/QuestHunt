const express=require('express');
const { getTrackerQuestSet,handleGetCurrentUser,getMission } = require('../Controller/info');

const router=express.Router();

router.post('/quests',getTrackerQuestSet);
router.post('/mission',getMission);
router.post('/me',handleGetCurrentUser);
module.exports=router