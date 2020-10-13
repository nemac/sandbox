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
$ npx create-react-app nca_sandbox-climate_chart-v2.app
$ cd nca_sandbox-climate_chart-v2.app
$ npm install gh-pages --save-dev
$ npm install react-plotly.js plotly.js
$ npm install axios
$ npm install @material-ui/core
$ npm install react-bootstrap bootstrap
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm install --save @fortawesome/free-solid-svg-icons
$ npm install --save @fortawesome/react-fontawesome

```
edit 'package.json'
- add ```"homepage" : "http://briandrawert.github.io/sandbox",``` to top level
- add ```  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"``` to the "scripts" section
- change ``` "start": "react-scripts start", ``` to ``` "start": "react-scripts --max_old_space_size=4096 start",``` in the "scripts" section
- change ``` "build": "react-scripts build", ``` to ``` "build": "react-scripts --max_old_space_size=4096 build",``` in the "scripts" section


Note, only one app can be deployed at a time.  Deploying will erase what is currently deployed.
