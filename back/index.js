const Express = require("express");
const Cors = require('cors');
const BodyParser = require('body-parser');
const multer = require('multer');

const Port = 5000;

const App = Express();
App.use(Cors());
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'PDF')
  },
  filename: function (req, file, cb) {
    cb(null, 'pdf')
  }
})

const uploadImg = multer({ storage: storageImage }).single('file');

App.post('/sendPdf', (req, res) => {
  uploadImg(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    else {
      res.status(200).json('okPdf')
    }
  })

})

App.listen(Port, () => {
  console.log(`Server started on port ${Port}`);
})