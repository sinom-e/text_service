# text_service

This nodejs server is to be run locally, on the same server as the web page.
The server listens on port 3000 for an http POST request containing a 
string, and responds with a URL to a text file containing that string. The 
client side can then make a GET request to the URL and download the file.

## Requesting data (JavaScript):

	* Configure an XML http POST request to localhost on port 3000
	
	* Define an asynchronous function to send a GET request with the response
	
	* Retrieve text and convert it to JSON format (JSON.stringify)
	
	* Send POST request 
	
### Sample function:
```
const sendRequest = () => {
	//XML http boilerplate
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:3000/upload');
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			const fileUrl = xhr.responseText;
			downloadFile(fileUrl);
		}
	};
  
	//retrieve contents of text input element (id 'text' in this example)
	const text = document.getElementById('text').value;
  
	//send request
	xhr.send(JSON.stringify({ text: text }));
};
```

## Receiving data (JavaScript):

The response contains a URL to the resulting text file. It can be
downloaded from the browser automatically with these steps:

	* Retrieve URL from server response
	
	* Create HTML link element and name it
	
	* Append element to DOM
	
	* Simulate clicking the link
	
	* Remove link element from DOM
	

### Sample function:
```
const downloadFile = (url) => {
	//create downloadable link and name it
	const link = document.createElement('a');
	link.href = url;
	link.download = 'textfile.txt';
	
	//add download link to DOM, simulate clicking it, and remove the link
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
```
