export interface Iuser {
     isUserLoggedIn: string,
     userId: any,
     tenant: any,
     role: string,
     credits: any,
     smartListInfo:any,
     profile: {
          name: {
               first: string,
               last: string
          },
          email: string,
          phone: string,
     },
     subscription?: any,
     token: any,
     userGeoInfo?: any
}