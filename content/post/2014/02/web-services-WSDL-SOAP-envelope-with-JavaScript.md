+++
title = "Web Services, WSDL, SOAP envelope with JavaScript"
date = "2014-02-02"
categories = [
    "Javascript",
]
+++

The main concept of Web Services is to exchange data between two devices using standardized protocols and messages.

<!--more-->

# What is Web Service and WSDL?

The W3C defines a `Web services`: a software system designed to support machine-to-machine interaction over network. Other systems interact with the Web service using `SOAP` messages, `REST`, or using `HTTP` with an XML serialization with other Web-related standards.

And for be little clear about `WSDL` (Web Services Description Language) - describes services as collection of network endpoints or ports in `XML` format.

Exchange messages usually accomplished by protocol `HTTP`. However, it should be noted that it is still used, but very rarely, protocol - `SMTP` (Simple Mail Transfer Protocol).

# SOAP protocol

Protocol `SOAP` transfers messages or small amount of information. `SOAP` messages formatted in `XML` and are typically send using `HTTP`. Some time ago `SOAP` was spelled as Simply Object Access Protocol. But time passed and everybody saws that protocol isn't simple and nothingness in common with access to objects.

<img alt="post-img" src="images/posts/web-services-WSDL-SOAP-envelope-with-JavaScript/soaps.jpg" alt="SOAP is just a soap">

# Example of SOAP envelope

The `SOAP` message has 3 parts: `envelope, head, body`. Body contains all `response/request` data. Also can say that head isn't required and in modern apps doesn't used.

<img alt="post-img" src="images/posts/web-services-WSDL-SOAP-envelope-with-JavaScript/soap-message.gif" alt="Example of SOAP envelope">

Example of SOAP XML:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<soapenv:Envelope
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xsd="http://www.w3.org/2001/XMLSchema"
	xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
	xmlns:urn="urn:WebservicesName"> <!-- service name -->
	<soap:Header>
	    <m:Trans xmlns:m="http://schemas.xmlsoap.org/soap/encoding/">Header</m:Trans>
        </soap:Header>
	<soapenv:Body>
		<!-- method name -->
		<urn:ProductService.getProductByHash
			soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
			<!-- request to server -->
			<return xsi:type="getProductByHash ">
				<product_hash xsi:type="xsd:string">product hash here!</product_hash>
			</return>
		</urn:ProductService.getProductByHash>
	</soapenv:Body>
</soapenv:Envelope>
```

What here have happened? In the beginning I created SOAP envelope, which call service with URN (Uniform Resource Name). Then calling method `getProductByHash`.

SOAP `response` of web-service have next view, only body tag:

```xml
<soapenv:Body>
	<urn:ProductService.getProductByHash
		soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
		<return xsi:type="getProductByHash ">.
		  <!-- response example -->
			<product_id xsi:type="xsd:string">260891</emag_id>
		</return>
	</urn:ProductService.getProductByHash>
</soapenv:Body>
```

#Create/receive SOAP request/response via $.soap

This script uses `$.ajax` to send a `SOAP envelope`. It can take `XML DOM`, `XML string` or `JSON` as input and the response can be returned as either `XML DOM`, `XML string` or `JSON` too.

Example:

```js
$.soap({
    url: 'http://my.server.com/soapservices/',
    method: 'helloWorld',

    data: {
        name: 'Remy Blom',
        msg: 'Hi!'
    },

    success: function (soapResponse) {
        // do stuff with soapResponse
        // if you want to have the response as JSON use soapResponse.toJSON();
        // or soapResponse.toString() to get XML string
        // or soapResponse.toXML() to get XML DOM
    },
    error: function (SOAPResponse) {
        // show error
    }
})
```

Full <a href="https://github.com/doedje/jquery.soap">$.soap</a> documentation.
