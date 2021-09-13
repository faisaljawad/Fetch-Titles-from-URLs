var View = require("../views/views");
var Utility = require("../lib/utility");
var Async = require("async");

exports.getTitles = function (req, res) {
    View.header(res);
    View.titleHeader(res);
    if (req.query.address instanceof Array) {
        var arrayLength = req.query.address.length;
        for (var counter = 0; counter < arrayLength; counter++) {
            Utility.requestTitle(req.query.address[counter], function (title, counter) {
                View.title(res, title);
                if (arrayLength === (counter + 1)) {
                    View.titleFooter(res);
                    View.footer(res);
                }
            });
        }
    } else {
        Utility.requestTitle(req.query.address, function (title) {
            View.title(res, title);
            View.titleFooter(res);
            View.footer(res);
        });
    }
};


exports.getTitlesAsync = function (req, res) {
    var stack = [];
    View.header(res);
    View.titleHeader(res);
    if (req.query.address instanceof Array) {
        var arrayLength = req.query.address.length;
        for (var counter = 0; counter < arrayLength; counter++) {
            Utility.getCompleteUrl(req.query.address[counter], function (x2) {
                var getCompleteTitle = function (callback) {
                    Utility.requestTitle(x2, function (title) {
                        callback(null, title);
                    });
                }
                stack.push(getCompleteTitle);
            });
        }
    } else {
        var getCompleteTitle = function (callback) {
            Utility.requestTitle(req.query.address, function (title) {
                callback(null, title);
            });
        }
        stack.push(getCompleteTitle);
    }
    Async.parallel(stack, function (err, records) {
        if (err) {
            console.log("error" + err);
        }
        for (var i = 0; i < records.length; i++) {
            View.title(res, records[i]);
        }
        View.titleFooter(res);
        View.footer(res);
    });
};