export class DateHelper {

     public from: Date;
     public to: Date;
     public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

     constructor() {

     }

     public getFromDate(mon) {
          let date = new Date();
          date.setMonth(date.getMonth() - mon);
          let year = date.getFullYear();
          let month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
          let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          let from = year + '-' + month + '-' + day + ' 00:00:00.000';
          this.from = new Date(from);
          return this.from;
     }

     public getToDate() {
          let date = new Date();
          let year = date.getFullYear();
          let month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
          let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          let to = year + '-' + month + '-' + day + ' 23:59:59.000';
          this.to = new Date(to);
          return this.to;
     }

     public getLastDate() {
          let date = new Date();
          let year = date.getFullYear();
          let month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
          let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          let to = year + '-' + month + '-' + day + ' 00:00:00.000';
          this.to = new Date(to);
          return this.to;
     }

     public getFilterFormatDate(date: Date) {
          let year = date.getFullYear();
          let month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
          let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
          let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
          let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
          let dt = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + second + '.000';
          return dt;
     }

     public getDateFromDate(dt) {
          let date = new Date(dt);
          let year = date.getFullYear();
          let month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
          let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
          let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
          let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
          let tdate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + second + '.000';
          return new Date(tdate);
     }

     public getDisplayFormatDate(date: Date, needtime = false) {
          let year = date.getFullYear();
          let month = date.getMonth();
          let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
          let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
          let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
          let dt = null;
          if (needtime) {
               dt = day + '-' + this.months[month].toUpperCase() + '-' + year + ' ' + hour + ':' + minutes + ':' + second;
          } else {
               dt = day + '-' + this.months[month].toUpperCase() + '-' + year;
          }
          return dt;
     }

     public getHoursAndMinutes(date: any) {
          let hours = date.getHours();
          let minutes = date.getMinutes();
          hours = hours < 10 ? '0' + hours : hours;
          minutes = minutes < 10 ? '0' + minutes : minutes;
          let stringTime = hours + ':' + minutes;
          return stringTime;
     }

     public secondsToTime(secs: any) {
          var days = Math.floor(secs / (24 * 60 * 60));
          var hours = Math.floor(secs / (60 * 60));
          var divisor_for_minutes = secs % (60 * 60);
          var minutes = Math.floor(divisor_for_minutes / 60);

          var divisor_for_seconds = divisor_for_minutes % 60;
          var seconds = Math.ceil(divisor_for_seconds);

          if (days != 0) {
               return `${days} Days ${hours} Hrs ${minutes} Min ${seconds} Sec`;
          } else if (hours != 0) {
               return `${hours} Hrs ${minutes} Min ${seconds} Sec`;
          } else if (minutes != 0) {
               return `${minutes} Min ${seconds} Sec`;
          } else {
               return `${seconds} Sec`;
          }
     }

     public getUnitAvailablityDateFormat(date) {
          let year = date.getFullYear();
          let month = date.getMonth();
          let dt = this.months[month].toUpperCase() + ' ' + year;
          return dt;
     }
}
