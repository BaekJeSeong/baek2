var express = require('express');
var app = express();
var router = express.Router();
var Board = require('../models/board');
var User = require('../models/user');
var session = require('express-session');
var Comment = require('../models/comment');
app.set('trust proxy', 1);

router.use(session({
  secret: 'tired',
  resave: false,
  saveUninitialized: true,
}));

router.get('/',function(req,res){
    console.log('신호받음')
    if(!req.session.user){
      res.render('home.ejs', { user: req.session.user });
    }else{
      res.render('home.ejs', { user: req.session.user });
    }
});

router.get('/test',function(req,res){
  console.log('신호받음')
  if(!req.session.user){
    res.render('test.ejs', { user: req.session.user });
  }else{
    res.render('test.ejs', { user: req.session.user });
  }
});
router.get('/list',function(req,res){
  console.log('신호받음')
  if(!req.session.user){
    res.render('list.ejs', { user: req.session.user });
  }else{
    res.render('list.ejs', { user: req.session.user });
  }
});
router.get('/about',function(req,res){
  console.log('신호받음')
  if(!req.session.user){
    res.render('about.ejs', { user: req.session.user });
  }else{
    res.render('about.ejs', { user: req.session.user });
  }
});
    router.get('/signUp',function(req,res){
        res.render('signUp.ejs');
    });
router.post('/signUp',function(req,res){
  User.find({id:req.body.id},function(err,user){ //find 
    if(err)throw err;
    if(user.length>0){
      //   alert('이미 아이디가 있소,,,');
      //아이디 존재
    }else{
      var user=new User({
        id:req.body.id,
          pw:req.body.pw
        })
        user.pw = user.generateHash(user.pw); 
     console.log("2")
        user.save(function(err){ //user 저장 
          if(err)throw err;
          res.redirect('/') //중복된 아이디가 없을떄 유저를 새로 정의함 
        })
       }
    })
  })


router.get('/news2',function(req,res){
    Board.find({},function(err,results){
        if(err) throw err;
        res.render('news2.ejs',{boards : results})
    })
})

router.get('/login',function(req,res){
    res.render('login.ejs');
})

router.post('/login',function (req,res){
    User.findOne({id:req.body.id},function(err,user){
      if(!user){
        console.log('wrong id!')
        res.redirect('/login')
      }else{
        if(!user.validateHash(req.body.pw)){
          console.log('wrong pw!')
          res.redirect('/login')
        }
      else{
        console.log('success');
        req.session.user=user.id;
        res.redirect('/')
      }
    }
  })
})


router.get("/show/:id",function(req,res){
    Board.findOne({_id: req.params.id}, function(err,boards){
        boards.hits++;
        boards.save();
        res.render("show.ejs",{result: boards})
    })
})

router.get('/about',function(req,res){
    res.render('about.ejs')
})

router.get('/writing',function(req,res){
    res.render('writing.ejs');
})

router.post('/writing', function (req, res) {
    // get과 post의 차이 (body안에 담아서 준다고?)
    var board = new Board({
      title: req.body.title,
      content: req.body.content,
      created_at: new Date(),
    // summit 했을때의 시간인가?
      hits: 0
    });
    board.save(function (err) {
    // function(err) ?
    // 난 스키마를 만들었을뿐인데 함수도 같이 정의됨??
      if (err) return console.error(err);
    });
    res.redirect('/list');
    // 왜 res.render가 아니고?
  });
  

router.post('/logout',function(req,res){
    req.session.destroy(function(err){
        res.redirect('/login');
        console.log("로그아웃 완료");
    })
})


router.post('/destroy/:id',function(req,res){     //얘는 왜 post?
    Board.remove({_id: req.params.id},function (err){
      res.redirect('/');
    });
});

router.get('/submit',function(req,res){
    res.render('submit.ejs')
});








// up 진현 down 지윤

router.get('/coding/:id',function(req,res){
    Board.findOne({_id: req.params.id},function(err,boards){
        boards.hits++;
        boards.save();
        Comment.find({super: req.params.id},function(err,comments){
            res.render("coding.ejs",{result: boards, comment: comments})
        })
       
    })
})

router.post('/coding/:id', function (req, res) {
    var comment = new Comment({
      
      content: req.body.content,
      created_at: new Date(),
      super: req.params.id,
    
    });
    comment.save(function (err) {
      if (err) return console.error(err);
    });
    res.redirect('/coding/'+req.params.id);
  });

  router.get('/writing_re',function(req,res){
    res.render('writing_re.ejs');
})

router.post('/writing_re', function (req, res) {
    var board = new Board({
      title: req.body.title,
      content: req.body.content,
      created_at: new Date(),
      modified_at: new Date(),
      category: req.body.category,
      hits: 0
    });
    board.save(function (err) {
      if (err) return console.error(err);
    });
    res.redirect('/list');
  });

 
router.get('/list',function(req,res){
    Board.find({},function(err,results){
        if(err) throw err;
        res.render('list.ejs', {boards : results})
    })
})


module.exports = router;