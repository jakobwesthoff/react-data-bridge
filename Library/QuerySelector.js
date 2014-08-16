define([
], function(
) {
    var QuerySelector = function() {

    };

    QuerySelector.prototype.query = function(selector, root) {
        root = root || document;
        return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    return QuerySelector;
});
