# improved-fa
A Chrome extension for enhancing the FA website.

Improved FA provides a series of lightweight plugins, each individually toggleable, that make small (primarily style-based) changes to the website.

Anyone can create a new plugin and submit a pull request, to have it added to the extension.

## Installation
You can install the Chrome extension [here](https://chrome.google.com/webstore/detail/improved-furaffinity/nlbnefhnhihfhkcpnjhbglpdlhboecbd).

Alternatively, you can install the extension locally, which may be useful if developing your own plugins.

## Mechanism
Each plugin contains one or more injectors, which match a certain set of pages. When one of those pages loads, certain files (scripts, styles, or both) are added to the page and make the required modifications.

#### Security
In theory, by tracking the contents of text fields on authentication pages, one could comprise a user's account. By hosting this project on GitHub, and being able to review and third-party contributions, we can ensure that no malicious code makes its way into the extension.

We also regularly review third-party plugins to ensure they are performing their intended purposes and are not spreading malware.

## Custom Plugins
**NOTE: This project is licensed under the GNU General Public License v3.0, and therefore, custom plugins must be made open-source and available for anyone to use. We recommend doing this by opening a pull request to include your plugin in the extension itself.**

If you are interested in making your own custom plugins, [read the Wiki](https://github.com/LachlanWalls/improved-fa/wiki/Creating-Plugins).

If you have an idea for a plugin, but can't make it yourself, submit an issue with the label 'plugin request' - NOT 'enhancement'!

#### enhancements.js enhancement format

```javascript
let enhancements = {
  ...
  "enhancement_name": {
    "injectors": [                                                    // required. An array of injector objects.
      ...
      {
        // pages are required. This should be an array of strings, either a url or a url ending with an asterisk.
        // this example will apply the injector for the root page, and any page under the browse directory.
        "pages": ["/", "/browse/*"],
        // styles & scripts are optional
        // filename: packages/enhancement_name/filename,
        // css or js: packages/enhancement_name/enhancement_name.css or packages/enhancement_name/enhancement_name.js
        "styles": ["mystyles.css", "css"],  
        "scripts": ["myscript.js", "js"],
        // externals are optional. We recommend minimising the use of externals as it will increase load time, and instead downloading the file locally.
        "externals": ["<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>"]
      },
    ],
    "pages": ["/", "/browse/*"],                                      // required. All of the page strings from the injectors, combined.
    "title": "My Enhancement",                                        // required. The title of your plugin.
    "description": "Improves... fixes... removes... enhances...",     // required. The description should provide a brief description of what the plugin does.
    "author": "your name"                                             // optional. Your name, username, or whatever.
  }
}
```

## Contributing
There are three ways to contribute:
- Make your own plugins! [Refer to the wiki](https://github.com/LachlanWalls/improved-fa/wiki/Creating-Plugins).
- If you can make plugins but have no ideas, check out issues under the label 'plugin request'. If you see one that interests you and hasn't been claimed, claim it!
- If you think there's functionality within the extension that could be improved, submit a feature request and show us!
        
  
