const express = require("express");
const router = express.Router();
const path = require("path");


router.get("/", (req, res, next) => {
  req.app.ingest.Videos.getAll({}, "", (error, { data }) => {
    return res.render("index", {
      title: "Welcome to the Ingest Starter!",
      user: req.user,
      videos: data
    });
  });
});

router.get("/livestreams", (req, res, next) => {
  req.app.ingest.Livestreams.getAll({}, "", (error, { data }) => {
    return res.render("index", {
      title: "Welcome to the Ingest Starter!",
      user: req.user,
      videos: data
    });
  });
});

router.get('/getvideos', (req, res, next) => {
  req.app.ingest.Videos.getAll({}, "", (error, { data }) => {
    return res.send({data: data});
  });
});

router.get("/livestreams/:id", (req, res, next) => {
  req.app.ingest.Livestreams.getById(req.params.id, (error, { data }) => {
    const { id, title, variant_urls, description } = data;
      return res.render("player", {
        id,
        title,
        variant_urls,
        description
      });
  });
});
router.get("/video/:id", (req, res, next) => {
  req.app.ingest.Videos.getById(req.params.id, (error, { data }) => {
    const { id, title, variant_urls, description } = data;
      return res.render("player", {
        id,
        title,
        variant_urls,
        description
      });
  });
});

router.get("/webcamtest", function(req, res) {
        res.sendfile(path.resolve(__dirname, '../views/webcamtest.html'));
  });

router.get("/video/next/:id", (req, res, next) => {
  req.app.ingest.Videos.getAll({}, "", (error, { data }) => {
    let found = false;
    while (!found) {
      // select a random video
      let rand = Math.floor(Math.random() * data.length);

      // check to see if it was the last video
      if (data[rand].id !== req.params.id) {
        // it's not, so we have "found" a new video
        found = data[rand].id;
      }
    }

    res.json({
      id: found
    });
  });
});


router.get("/webcamtest", (req, res) => {
    res.sendfile(path.resolve('views/clm_emotiondetection.html'));
});

module.exports = router;
