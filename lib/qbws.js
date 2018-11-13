'use strict';

var utility = require('./utility');
const Entities = require('html-entities').XmlEntities;


function authenticateResponse(strArray) {
    var response = {
        "authenticateResponse": {
            "authenticateResult": {
                "string": strArray
            },
            "@xmlns": "http://developer.intuit.com/"
        }

    };

    return utility.buildXml(response);

}

function clientVersionResponse(clientVersion) {
   var response = {
        "clientVersionResponse": {
            "clientVersionResult": clientVersion,
            "@xmlns": "http://developer.intuit.com/"
        }

    };

    return utility.buildXml(response);

}


function closeConnectionResponse(result) {
   var response = {
        "closeConnectionResponse": {
            "closeConnectionResult": result,
            "@xmlns": "http://developer.intuit.com/"
        }
    };

    return utility.buildXml(response);

}

function connectionErrorResponse(result) {
    var response = {
        "connectionErrorResponse": {
            "connectionErrorResult": {
               "string": result
            },
            "@xmlns": "http://developer.intuit.com/"
        }
    };

    return utility.buildXml(response);

}


function getLastErrorResponse(error) {
    var response = {
        "getLastErrorResponse": {
            "getLastErrorResult": error,
            "@xmlns": "http://developer.intuit.com/"
        }
    }

    return utility.buildXml(response);

}


function interactiveDoneResponse(result) {
    var response = {
        "interactiveDoneResponse": {
            "interactiveDoneResult": result,
            "@xmlns": "http://developer.intuit.com/"
        }
    };

    return utility.buildXml(response);

}



function serverVersionResponse(serverVersion) {
    var response = {
        "serverVersionResponse": {
            "serverVersionResult": serverVersion,
            "@xmlns": "http://developer.intuit.com/"
        }
    };


    return utility.buildXml(response);

}




function receiveResponseXMLResponse(result) {
    var response = {
        "receiveResponseXMLResponse": {
            "receiveResponseXMLResult": result,
            "@xmlns": "http://developer.intuit.com/"
        }
    };

    return utility.buildXml(response);
}



function sendRequestXML(sendRequest) {
    const entities = new Entities();
    sendRequest = '<?xml version="1.0"?><?qbxml version="4.0"?>' + sendRequest;
    sendRequest = entities.encode(sendRequest);

    var response = {
        "sendRequestXMLResponse": {
            "sendRequestXMLResult": sendRequest,
            "@xmlns": "http://developer.intuit.com/"
        }
    };
    return utility.buildXml(response).replace(/&amp;/g, "&");
}

exports.authenticateResponse = authenticateResponse;
exports.clientVersionResponse = clientVersionResponse;
exports.closeConnectionResponse = closeConnectionResponse;
exports.getLastErrorResponse = getLastErrorResponse;
exports.interactiveDoneResponse = interactiveDoneResponse;
exports.connectionErrorResponse = connectionErrorResponse;
exports.serverVersionResponse = serverVersionResponse;
exports.receiveResponseXMLResponse = receiveResponseXMLResponse;
exports.sendRequestXML = sendRequestXML;
