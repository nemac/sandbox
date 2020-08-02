# sandbox
Sandbox for investigating climate varriables


To publish the side, on your local computer (in the terminal)
```
$ cd my-app
$ npm run deploy
```
Then navigate to https://briandrawert.github.io/sandbox/





To create an app, and set it up for github deploy:
Ref: https://github.com/gitname/react-gh-pages
```
$ npx create-react-app nca_sandbox-climate_chart-v1.app
$ cd nca_sandbox-climate_chart-v1.app
$ npm install gh-pages --save-dev
```
edit 'package.json'
- add ```"homepage" : "http://briandrawert.github.io/sandbox",``` to top level
- add ```  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"``` to the "scripts" section


Note, only one app can be deployed at a time.  Deploying will erase what is currently deployed.
