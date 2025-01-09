const express = require('express')
const router =express.Router();
const {QuestAdder ,MissionAdder, deleteMission }=require('../Controller/mission');
const { updateQuestCompletion } = require('../Controller/tracker');

//Quest add 
router.post('/quest',QuestAdder);
router.post('/mission',MissionAdder);
router.post('/done',updateQuestCompletion);
router.post('/delete',deleteMission);
//mission  section

module.exports=router