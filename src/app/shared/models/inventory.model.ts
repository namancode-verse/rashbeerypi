export class InventoryModel {
     public template = {
          header: [
               {
                    label: 'Building Name',
                    name: 'BuildingName',
                    placeholder: 'Building Name',
                    alias: 'building-name',
                    tag: 'input',
                    type: 'input',
                    default: {
                         value: '',
                         styles: {
                              disabled: false
                         },
                         validation: [
                              {
                                   required: true,
                                   message: ''
                              },
                              {
                                   lenght: true,
                                   message: '',
                                   min: 10,
                                   max: 20
                              },
                              {
                                   email: false,
                                   message: ''
                              },
                              {
                                   number: false,
                                   message: ''
                              }
                         ]
                    },
                    options: [
                         {
                              name: '',
                              value: '',
                              selected: true
                         },
                         {
                              name: '',
                              value: '',
                              selected: false
                         }
                    ]
               }
          ]
     };
}
