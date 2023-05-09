const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const server = express();
const port = 3000;

const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
server.use(cors(corsOptions));

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//upload route
server.post('/upload', (req, res) => {
	//retrieve text and init new file
	const text = req.body.text;
	const fileName = 'textfile.txt';
	const filePath = './' + fileName;
  
  //save string in new file, respond with URL to file
	fs.writeFile(filePath, text, (err) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error writing file');
		} else {
			const fileUrl = req.protocol + '://' + req.get('host') + '/' + fileName;
			res.send(fileUrl);
		}
	});
});

//download route
server.get('/:fileName', (req, res) => {
	const fileName = req.params.fileName;
	const filePath = './' + fileName;
	res.download(filePath);
});

//init
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
