'use strict';

const uuid = require('node-uuid');
const helpers = require('../qbws');
const { messages } = require('elasticio-node');
var builder = require('xmlbuilder');



exports.process = async function ProcessAction(msg) {

    
    var response = "";

    try {
        console.log("request Body : " + JSON.stringify(msg.body));
        if (msg.body["soap-Envelope"]) {
            const body = msg.body["soap-Envelope"]["soap-Body"];
            if (body.clientVersion) {
                var clientVersion = 'O:' + body.clientVersion.strVersion;
                response = helpers.clientVersionResponse("");

            } else if (body.serverVersion) {

                var serverVersion = "0.2.1";
                response = helpers.serverVersionResponse(serverVersion);

            } else if (body.authenticate) {
                //authReturn[0] = uuid.v1();
                //var args = body.authenticate;

                //if (args.strUserName.trim() === "username" && args.strPassword.trim() === "password") {
                //    req = buildRequest();

                //    if (req.length === 0) {
                //        authReturn[1] = 'NONE';
                //    } else {
                //        // An empty string for authReturn[1] means asking QBWebConnector
                //        // to connect to the company file that is currently opened in QB
                //        authReturn[1] = companyFile;
                //    }
                //} else {
                //    authReturn[1] = 'nvu';
                //}



                var strArray = [];
                strArray.push(uuid.v1());
                strArray.push("");
                response = helpers.authenticateResponse(strArray);




            }
            else if (body.sendRequestXML) {
               
                //var sendRequest = builder.begin()
                //    .instruction('xml', 'version="1.0" encoding="utf-8"')
                //    .instruction('qbxml', 'version="13.0"')
                //    .ele('QBXML')
                //    .ele('QBXMLMsgsRq', { 'onError': 'stopOnError' })
                //    .ele('EmployeeQueryRq', { 'metaData': 'ENUMTYPE' }) // Vendor Query Request... 
                //    .ele('ActiveStatus').text('All').up()
                //    .end({ 'pretty': false });


                var inputXMLDoc = builder.begin()
                    .ele('QBXML')
                    .ele('QBXMLMsgsRq', { 'onError': 'stopOnError' })
                    .ele('CustomerQueryRq', { 'requestID': '1' })
                    .ele('MaxReturned')
                    .text('1');
                var strRequestXML = inputXMLDoc.end({ 'pretty': false });
                response = helpers.sendRequestXML(strRequestXML);

          

            }
            else if (body.receiveResponseXML) {
                response = helpers.receiveResponseXMLResponse(100);
            }
            else if (body.connectionError) {
                var args = body.connectionError;
                var hresult = args.hresult;
                var message = args.message;
                var retVal = null;
                    // 0x80040400 - QuickBooks found an error when parsing the
                    //     provided XML text stream.
                var QB_ERROR_WHEN_PARSING = '0x80040400';
                    // 0x80040401 - Could not access QuickBooks.
                var QB_COULDNT_ACCESS_QB = '0x80040401';
                    // 0x80040402 - Unexpected error. Check the qbsdklog.txt file for
                    //     possible additional information.
                var QB_UNEXPECTED_ERROR = '0x80040402';
                // Add more as you need...


                var connectionErrCounter = 0;

                if (connectionErrCounter === null) {
                    connectionErrCounter = 0;
                }

               // announceMethod('connectionError', args);

                // TODO: Why is the same code repeated thrice? Switch statement instead?
                if (hresult.trim() === QB_ERROR_WHEN_PARSING) {
                  //  serviceLog('    HRESULT = ' + hresult);
                   // serviceLog('    Message = ' + message);
                    retVal = 'DONE';
                } else if (hresult.trim() === QB_COULDNT_ACCESS_QB) {
                   // serviceLog('    HRESULT = ' + hresult);
                  //  serviceLog('    Message = ' + message);
                    retVal = 'DONE';
                } else if (hresult.trim() === QB_UNEXPECTED_ERROR) {
                   // serviceLog('    HRESULT = ' + hresult);
                   // serviceLog('    Message = ' + message);
                    retVal = 'DONE';
                } else {
                    // Depending on various hresults return different value
                    if (connectionErrCounter === 0) {
                        // Try again with this company file
                       // serviceLog('    HRESULT = ' + hresult);
                        //serviceLog('    Message = ' + message);
                       // serviceLog('    Sending empty company file to try again.');
                        retVal = '';
                    } else {
                       // serviceLog('    HRESULT = ' + hresult);
                       // serviceLog('    Message = ' + message);
                      //  serviceLog('    Sending DONE to stop.');
                        retVal = 'DONE';
                    }
                }




                response = helpers.connectionErrorResponse(retVal);
                

            }
            else if (body.getLastError) {
                response = helpers.getLastErrorResponse("");

            }
            else if (body.closeConnection) {
                response = helpers.closeConnectionResponse("");

                console.log("Unsupported Action");

            }
            else {
                console.log("Unsupported Action");
            }
        }
    } catch (ex) {

        console.log("Error : " + ex);
    }
    this.emit('data', messages.newMessageWithBody({ "response": response }));
};