define([
    "react",
    "DataAttributeReader",
    "QuerySelector"
], function(
    React,
    DataAttributeReader,
    QuerySelector
) {
    var ReactDataBridge = function(selector, reader) {
        this.selector_ = selector;
        this.reader_ = reader;
    };

    ReactDataBridge.prototype.getComponent_ = function(name) {
        var nameParts = name.split(".");
        var component = window;
        nameParts.forEach(function(part) {
            if (component === undefined) {
                return;
            }
            component = component[part];
        });

        return component;
    };

    ReactDataBridge.prototype.decodeProps_ = function(props) {
        var decodedProps = {};

        var key;
        for (key in props) {
            if (props.hasOwnProperty(key)) {
                if (props[key].indexOf("{") === 0 || props[key].indexOf("[") === 0) {
                    decodedProps[key] = JSON.parse(props[key]);
                } else {
                    decodedProps[key] = props[key];
                }
            }
        }
        return decodedProps;
    };

    ReactDataBridge.prototype.apply = function(fragment) {
        var targets = this.selector_.query("[data-react-bridge]", fragment);
        targets.forEach(function(target, index) {
            var componentName = this.reader_.get(target, "react-bridge");
            var Component = this.getComponent_(componentName);
            if (Component === undefined) {
                console.warn("Invalid data-react-bridge component: ", componentName);
                return;
            }

            var props = this.decodeProps_(this.reader_.list(target, "react-prop-"));
            React.renderComponent(
                Component(props),
                target
            );
        }.bind(this));
    };

    /**
     * Provide a fully injected entry point with the capability to overwrite
     * injected tools if this is wanted.
     */
    return function(querySelector, dataAttributeReader) {
        querySelector = querySelector || new QuerySelector();
        dataAttributeReader = dataAttributeReader || new DataAttributeReader();

        return new ReactDataBridge(
            querySelector,
            dataAttributeReader
        );
    };
});
