define([
], function(
) {
    var DataAttributeReader = function() {

    };

    DataAttributeReader.prototype.get = function(element, attribute) {
        return element.getAttribute("data-" + attribute);
    };

    DataAttributeReader.prototype.list = function(element, prefixFilter) {
        prefixFilter = prefixFilter || "";
        prefixFilter = "data-" + prefixFilter;

        var attributeValueMap = {};
        Array.prototype.map.call(element.attributes, function(attribute) {
            return attribute.localName;
        }).filter(function(attribute) {
            return attribute.indexOf(prefixFilter) === 0;
        }).forEach(function(attribute) {
            attributeValueMap[attribute.substring(prefixFilter.length)] = element.getAttribute(attribute);
        });

        return attributeValueMap;
    };

    return DataAttributeReader;
});
