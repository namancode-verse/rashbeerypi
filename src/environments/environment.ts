export const environment = {
     name: 'localhost',
     production: false,
     config: {
          client: {
               url: 'http://localhost:4200/'
          },
          api: {
               url: '',
               devCoreURL: '',
               devOnBoardURL: '',
               placementDriveURL: 'http://localhost:6400/api/'
          },
          social: {
               google: {
                    clientId: '',
                    recaptchaSiteId: ''
               },
               facebook: {
                    clientId: ''
               }
          },
          security: {
               enable: false
          },
          display: {
               signup: true,
               gstarted: true
          },
          load: {
               gmap: false,
               geolocation: false
          },
          domain: {
               'smart-list': 'http://localhost:6400/'
          },
          keys: {
               'public-api': '1234'
          },
          default: {
               city: 2
          },
          aws: {
               awsPoolID: '',
               awsCognitoRegion: '',
               awsProjectResion: '',
               region: '',
               serverName: '',
               bucket: '',
               accessKeyID: '',
               secretAccessKey: ''
          }
     }
};
