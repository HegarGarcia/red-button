// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBcSX4s4GKhotJcA90mF-EMQeN1A-k4_Cc',
    authDomain: 'security-colima-2018.firebaseapp.com',
    databaseURL: 'https://security-colima-2018.firebaseio.com',
    projectId: 'security-colima-2018',
    storageBucket: 'security-colima-2018.appspot.com',
    messagingSenderId: '296041100489'
  },
  mapBox: {
    accessToken:
      'pk.eyJ1IjoiaGVnYXJnYXJjaWEiLCJhIjoiY2pveGFvbjJrMjJzMTNvczB5aDl2ZnJwOCJ9.0eXyJHqvZT0CGi6YBnAEnQ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
