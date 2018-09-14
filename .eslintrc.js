module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      "comma-dangle": ["error", "never"],
      "import/no-unresolved": "off",
      "linebreak-style": ["error", "windows"]
    },
    "env": {
      "browser": true,
      "node": true
    },
    "globals": {
      "document": false
    }    
};