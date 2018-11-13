'use strict';
var builder = require('xmlbuilder');

function createXMLBody(soapBody) {

    var body = {
        "soap:Envelope": {
            "soap:Body": soapBody,
            "@xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
            "@xmlns:tns": "http://developer.intuit.com/",
            "@xmlns:tm": "http://microsoft.com/wsdl/mime/textMatching/"

        }
    };
    return body;
}


function buildXml(xml) {
    var body = builder.create(createXMLBody(xml), { encoding: 'utf-8' });
    return body.end({ pretty: true });
}


/**
 * @function parseForVersion
 *
 * @desc Parses the first two version components out of the standard four
 *   component version number: `<Major>.<Minor>.<Release>.<Build>`.
 *
 * @example
 *   // returns 2.0
 *   parseForVersion('2.0.1.30');
 *
 * @param {String} input - A version number.
 *
 * @returns {String} First two version components (i.e. &lt;Major>.&lt;Minor>)
 *   if `input` matches the regular expression. Otherwise returns `input`.
 */
function parseForVersion(input) {
    // As long as you get the version in right format, you could use
    // any algorithm here.
    var major = '';
    var minor = '';
    var version = /^(\d+)\.(\d+)(\.\w+){0,2}$/;
    var versionMatch;

    versionMatch = version.exec(input.toString());

    if (versionMatch !== null) {
        major = versionMatch[1];
        minor = versionMatch[2];

        return major + '.' + minor;
    } else {
        return input;
    }
}





exports.parseForVersion = parseForVersion;
exports.createXMLBody = createXMLBody;
exports.buildXml = buildXml;