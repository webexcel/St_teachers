
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-device.device",
          "file": "plugins/cordova-plugin-device/www/device.js",
          "pluginId": "cordova-plugin-device",
        "clobbers": [
          "device"
        ]
        },
      {
          "id": "cordova-plugin-filechooser.FileChooser",
          "file": "plugins/cordova-plugin-filechooser/www/fileChooser.js",
          "pluginId": "cordova-plugin-filechooser",
        "clobbers": [
          "fileChooser"
        ]
        },
      {
          "id": "com-badrit-base64.Base64",
          "file": "plugins/com-badrit-base64/www/Base64.js",
          "pluginId": "com-badrit-base64",
        "clobbers": [
          "navigator.Base64"
        ]
        },
      {
          "id": "cordova-plugin-filepath.FilePath",
          "file": "plugins/cordova-plugin-filepath/www/FilePath.js",
          "pluginId": "cordova-plugin-filepath",
        "clobbers": [
          "window.FilePath"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "com-badrit-base64": "0.2.0",
      "cordova-plugin-device": "2.1.0",
      "cordova-plugin-filechooser": "1.2.0",
      "cordova-plugin-filepath": "1.6.0"
    };
    // BOTTOM OF METADATA
    });
    