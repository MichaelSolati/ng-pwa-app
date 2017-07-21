// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseAPI: 'http://localhost:5002/ng-pwa-app/us-central1/api/',
  firebase: {
    apiKey: 'AIzaSyDOBh4qhRGiwl95Iy4ZJ8blIw1dZAfAuQk',
    authDomain: 'ng-pwa-app-dev.firebaseapp.com',
    databaseURL: 'https://ng-pwa-app-dev.firebaseio.com',
    projectId: 'ng-pwa-app-dev',
    storageBucket: '',
    messagingSenderId: '28729956825'
  },
  applicationServerKey: null
};
