const express=require('express')
const router=express.Router();
const mongoose=require('mongoose')
const Vote = require('../models/vote')
const Pusher = require('pusher')



var pusher = new Pusher({
  appId: '1005408',
  key: 'f3b7c2ef9efdb3b6fc01',
  secret: '7e667747be2c1ed2fddd',
  cluster: 'ap2',
  encrypted: true
});


router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/',(req,res)=>{
    const newVote={
      app: req.body.app,
      points:1
    }
    new Vote(newVote).save().then(vote => {
      pusher.trigger('app-poll', 'app-vote', {
        points: parseInt(vote.points),
        app: vote.app
      })
      return res.json({success: true,message:'Thank you for voting'})
})
})
module.exports = router;