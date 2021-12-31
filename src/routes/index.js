var express = require('express');
var router = express.Router();
var rpio = require('rpio')

var time = 0;

async function openclose_door(time){
  rpio.write(16, rpio.HIGH);
  setTimeout(()=>{
    rpio.write(16, rpio.LOW);
    console.log('msg10:openclosed door after time', time)}, time*1000 );
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/opendoor',(req,res)=>{
  res.redirect('/')
})

router.get('/closedoor',(req,res)=>{
  res.redirect('/')
})

router.get('/opendoor-*',(req,res)=>{
  console.log('msg',req.path)
  temptime = req.path.split('-')[1]
  console.log('msg2', temptime, typeof(temptime))

  //is number
  if(isNaN(temptime)){
    console.log('msg2.2: no valid time')
    res.redirect('/')
    return
  }

  time = parseInt(temptime)
  console.log('msg3',time, typeof(time))
  if(time<-1 || time > 8){
    time = 8
    console.log('msg4: limited time')
  }

  openclose_door(time)

  res.redirect('/')
})

module.exports = router;
