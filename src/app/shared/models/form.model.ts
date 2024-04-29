export class FormModel {
     public formErrors: any = {
          broadcastForm: {
               requestAdd: '',
               accessKeyId: '',
               accessKey: '',
               deviceSn: '',
               template: '',
               language: '',
               amount: ''
          },
          signup: {
               firstName: '',
               lastName: '',
               phone: '',
               email: '',
               password: '',
               cpassword: '',
               recaptcha: '',
               tandc: ''
          },
          login: {
               username: '',
               password: '',
               recaptcha: ''
          }
     };

     public validationMessage: any = {
          login: {
               username: {
                    required: 'Username is required.'
               },
               password: {
                    required: 'Password is required.'
               },
               recaptcha: {
                    required: 'Captcha is required.'
               }
          },
          broadcastForm: {
               requestAdd: {
                    required: 'Request Add is required.'
               },
               accessKeyId: {
                    required: 'Accesss Key Id is required.'
               },
               accessKey: {
                    required: 'Access Key is required.'
               },
               deviceSn: {
                    required: 'Device Sn is required.'
               },
               template: {
                    required: 'Template is required.'
               },
               language: {
                    required: 'Language is required.'
               },
               amount: {
                    required: 'Amount is required.'
               }
          }
     };
}
