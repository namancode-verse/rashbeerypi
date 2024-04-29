import { DatePipe } from '@angular/common';
export class CustomDateTime {
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

     public timeSince(date: any, datePipe: DatePipe) {
          var time = new Date().getTime() - new Date(date).getTime();
          let seconds = Math.floor(time / 1000);
          var interval = seconds / 31536000;

          interval = seconds / 604800;
          if (interval > 1) {
               return datePipe.transform(date, 'dd MMM yyyy');
          }
          interval = seconds / 86400;
          if (interval > 1) {
               if (interval >= 2) {
                    return Math.floor(interval) + ' days ago';
               } else {
                    return Math.floor(interval) + ' day ago';
               }
          }
          interval = seconds / 3600;
          if (interval > 1) {
               if (interval >= 2) {
                    return Math.floor(interval) + ' hours ago';
               } else {
                    return Math.floor(interval) + ' hour ago';
               }
          }
          interval = seconds / 60;
          if (interval > 1) {
               if (interval >= 2) {
                    return Math.floor(interval) + ' minutes ago';
               } else {
                    return Math.floor(interval) + ' minute ago';
               }
          }
          return '1 minute ago';
     }
}
