!function(){"use strict";function a(a,b,c,d,e){console.log("AttendanceController Constructor"),this.eventId=a.eventId,this.$timeout=b,this.$moment=c,this.EventdataService=d,this.MemberdataService=new e(this.eventId)}function b(a){var b,c="";for(b=0;b<a.length;b++)c=c+a[b].choice+"\n";return c}function c(){var a,b=[];for(a=0;a<h.eventDateArray.length;a++){var c={date:h.eventDateArray[a],choice:"△"};b[a]=c}h.memberData={id:"",name:"",choiceSet:b,comment:""}}function d(a){console.log("AttendanceController parseLineBreaks Method");var b,c=a.split(/\r\n|\r|\n/);for(b=0;b<c.length;b++)c[b].length<=0&&c.splice(b,1);return c}function e(){console.log("AttendanceController dispMemberList Method");var a=h.MemberdataService.query();a.then(function(a){var b,c=[];for(b=0;b<a.length;b++)c.push({id:a[b].id,name:a[b].value.name,choice:d(a[b].value.choice),comment:a[b].value.comment});h.memberList=c,h.memberCount=a.length})["catch"](function(a){console.log(a)})}function f(a){console.log("AttendanceController setMemberData Method");var b,c=[];for(b=0;b<h.eventDateArray.length;b++){var d={date:h.eventDateArray[b],choice:a.choice[b]};c[b]=d}h.memberData={id:a.id,name:a.name,choiceSet:c,comment:a.comment}}function g(a){console.log("AttendanceController getEventData Method");var b=h.EventdataService.get(a);b.then(function(a){h.eventData=a.value,h.eventDateArray=d(h.eventData.date),c(),e()})["catch"](function(a){console.log(a),h.errorMode=!0})}angular.module("rakusuke.components.attendance",["rakusuke.service.eventdata","rakusuke.service.memberdata"]).controller("AttendanceController",a),a.$inject=["$routeParams","$timeout","$moment","EventdataService","MemberdataService"],a.prototype.activate=function(){console.log("AttendanceController activate Method"),h=this,h.editMode=!1,h.errorMode=!1,h.initButton=!0,h.memberCount=0,h.editOffset=j,h.eventData="",h.memberData={id:"",name:"",choiceSet:[],comment:""},h.eventId?g(h.eventId):h.errorMode=!0},a.prototype.editMember=function(a){this.$timeout(function(){h.editOffset=j,h.editMode=!0,h.initButton=!0,f(a)})},a.prototype.initMember=function(){this.$timeout(function(){h.editOffset=i,h.editMode=!0,h.initButton=!1,c()})},a.prototype.submitMember=function(){console.log("AttendanceController submitMember Method");var a=b(h.memberData.choiceSet),c=0===h.memberData.name.length?"名無しさん":h.memberData.name,d={name:c,comment:h.memberData.comment,choice:a},e={id:h.memberData.id,value:d},f=h.MemberdataService.save(e);f.then(function(a){h.editOffset=j,h.editMode=!1,h.initButton=!0})["catch"](function(a){console.log(a)})},a.prototype.refreshMemberList=function(){console.log("AttendanceController refreshMemberList Method"),e()};var h,i="-200",j="60"}(),function(){"use strict";function a(a){console.log("EventlistController Constructor"),this.EventdataService=a}function b(){console.log("HomeController read Method");var a=c.EventdataService.query();a.then(function(a){c.schedule=a})["catch"](function(a){console.log(a)})}angular.module("rakusuke.components.eventlist",["rakusuke.service.eventdata"]).controller("EventlistController",a),a.$inject=["EventdataService"],a.prototype.activate=function(){console.log("EventlistController activate Method"),c=this,b()},a.prototype.remove=function(a){console.log("EventlistController remove Method id:",a);var d=c.EventdataService.remove(a);d.then(function(a){b()})["catch"](function(a){console.log(a)})};var c}(),function(){"use strict";function a(a,b,c,d){console.log("HomeController Constructor"),this.$moment=a,this.$location=b,this.EventdataService=c,this.MemberdataService=d,this.$moment.locale("ja",{weekdays:["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],weekdaysShort:["日","月","火","水","木","金","土"]})}function b(a){var b="";return b=a.replace(/[\r\n|\r|\n]{1,}/,"\n")}angular.module("rakusuke.components.home",["rakusuke.service.eventdata","rakusuke.service.memberdata"]).controller("HomeController",a),a.$inject=["$moment","$location","EventdataService","MemberdataService"],a.prototype.activate=function(){console.log("HomeController activate Method"),c=this,c.creationSuccess=!1,c.attendanceUrl="",c.datepicker=new Date,c.minDate=this.minDate?null:new Date,c.maxDate=new Date(2020,5,22),c.eventData={title:"",description:"",choices:"◯\n△\n×",date:""}},a.prototype.getDayClass=function(a,b){console.log("HomeController getDayClass Method");var c=new Date;c.setDate(c.getDate()+1);var d=new Date;d.setDate(c.getDate()+2);var e=[{date:c,status:"full"},{date:d,status:"partially"}];if("day"===b)for(var f=new Date(a).setHours(0,0,0,0),g=0;g<e.length;g++){var h=new Date(e[g].date).setHours(0,0,0,0);if(f===h)return e[g].status}return""},a.prototype.addDate=function(a){console.log("HomeController addDate Method"),c.eventData.date=c.eventData.date+c.$moment(a).format("MM月DD日（ddd） 19:00〜")+"\n"},a.prototype.submitEvent=function(){console.log("HomeController submitEvent Method"),c.eventData.date=b(c.eventData.date);var a={id:"",value:c.eventData},d=c.EventdataService.save(a);d.then(function(a){var b=c.$location.port()?":"+c.$location.port():"";c.attendanceUrl=c.$location.protocol()+"://"+c.$location.host()+b+"/attendance/"+a.id,c.creationSuccess=!0})["catch"](function(a){console.log(a)})};var c}(),function(){"use strict";function a(a){a.html5Mode(!0)}angular.module("rakusuke.config",[]).config(a),a.$inject=["$locationProvider"]}(),function(){"use strict";function a(a){return a}angular.module("rakusuke.service.apimain",["rakusuke.service.apimilkcocoa"]).factory("ApimainService",a),a.$inject=["ApimilkcocoaService"]}(),function(){"use strict";function a(a){return console.log("ApimilkcocoaService Constructor"),function(b,c){this.milkcocoa=new MilkCocoa("postiecel9pz.mlkcca.com"),c?this.ds=this.milkcocoa.dataStore(b).child(c):this.ds=this.milkcocoa.dataStore(b),this.setUri=function(a){console.log("apimilkcocoaService setUri method uri:",a),b=a},this.get=function(b){var c=a.defer();return this.ds.get(b,function(a,b){c.resolve(b),console.log(b)}),c.promise},this.query=function(){var b=a.defer();return this.ds.stream().size(100).next(function(a,c){b.resolve(c)}),b.promise},this.save=function(b){var c=a.defer();return b.id?this.ds.set(b.id,b.value,function(a,b){c.resolve(b)}):this.ds.push(b.value,function(a,b){c.resolve(b)}),c.promise},this.remove=function(b){var c=a.defer();return this.ds.remove(b,function(a,b){c.resolve(b)}),c.promise},this.on=function(a,b){return this.ds?(this.ds.on(a,function(a){b()}),!0):!1},this.off=function(a){return this.ds?(this.ds.off(a),!0):!1}}}angular.module("rakusuke.service.apimilkcocoa",[]).factory("ApimilkcocoaService",a),a.$inject=["$q"]}(),function(){"use strict";function a(a){var b=new a("event");return b}angular.module("rakusuke.service.eventdata",["rakusuke.service.apimain"]).factory("EventdataService",a),a.$inject=["ApimainService"]}(),function(){"use strict";function a(a){var b=a("/api/gruntfiles",{query:{transformResponse:function(a){return angular.fromJson(a)}}});return b}angular.module("rakusuke.service.gruntfiles",["ngResource"]).factory("GruntfilesService",a),a.$inject=["$resource"]}(),function(){"use strict";function a(a){return function(b){console.log("MemberdataService eventId;",b);var c=new a("event",b);return c}}angular.module("rakusuke.service.memberdata",["rakusuke.service.apimain"]).factory("MemberdataService",a),a.$inject=["ApimainService"]}(),function(){"use strict";function a(){}angular.module("rakusuke",["ngNewRouter","rakusuke.config","ui.bootstrap","ngTouch","angular-momentjs","smoothScroll","rakusuke.components.home","rakusuke.components.attendance","rakusuke.components.eventlist"]).controller("AppController",a),a.$routeConfig=[{path:"/",redirectTo:"/home"},{path:"/home",component:"home"},{path:"/attendance/:eventId",component:"attendance"},{path:"/eventlist",component:"eventlist"}],a.$inject=[]}();