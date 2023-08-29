
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "A daily journal is my personal haven, where I encapsulate the essence of each day. In its pages, I weave a tapestry of thoughts, experiences, and reflections. It's a canvas for self-expression, a mirror reflecting growth and insights. Whether capturing fleeting moments or delving deep into the day's events, my journal is a sanctuary of self-discovery and development, preserving the uniqueness of each passing day.";
const aboutContent = "Hey there, I'm ItsJoey, a MERN stack developer and full-stack enthusiast. I'm all about weaving creativity into code. With MongoDB, Express.js, React, and Node.js in my toolkit, I craft web applications that blend functionality with a touch of visual magic.I've got a knack for diving into the nitty-gritty of things. From database structures to sleek front-end interfaces, I'm driven by a passion for solving problems. Building dynamic digital experiences is my jam.But it's not just about code for me; it's about continuous learning. Every day is a chance to explore new possibilities and hone my skills. Through the MERN stack, I'm writing my own story in the vast world of technology.";
const contactContent = "Feel free to reach out to me at itsjoeysan@gmail.com. Let's connect and chat about all things tech! You can also find me on Twitter @itsjoeysan, where I share insights and updates from the coding world. For a visual glimpse into my journey, follow me on Instagram @itsjoeysan. And if you're looking to network professionally, connect with me on LinkedIn @itsjoeysan. Looking forward to connecting with fellow tech enthusiasts and collaborators!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//this variable is storing my content
const posts = [];

//homepage
app.get("/",function(req, res){
    res.render("home",{homeStartingContent: homeStartingContent ,
       posts: posts
      });
});

//this is to add dynamic links
app.get("/posts/:postName", function(req, res){


  const requestTitle =_.lowerCase([string=req.params.postName]);
  for(const post of posts){
    const currentTitle = _.lowerCase([string=post.blogTitle]);
    if(requestTitle===currentTitle){
      res.render("post",{blogTitle: post.blogTitle, blogContent: post.blogContent});
    }else{
      console.log("not matched");
    }
  };

});

//about page
app.get("/about",function(req,res){
  res.render("about",{aboutMe: aboutContent});
});

//contact page
app.get("/contact",function(req,res){
  res.render("contact",{contactMe: contactContent});
});

//compose post page
app.get("/compose",function(req,res){
  res.render("compose");
});


//storing composed post inside myblog object
app.post("/compose",function(req, res){
  const myblog = {
    blogTitle : req.body.blogTitle,
    blogContent : req.body.blogContent
  };

  posts.push(myblog);
  res.redirect("/");
});













app.listen(3000, function() {
  console.log("Server started on port 3000");
});
