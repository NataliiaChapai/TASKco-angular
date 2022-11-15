"use strict";(self.webpackChunktask_controller_angular=self.webpackChunktask_controller_angular||[]).push([[22],{2022:(Q,p,a)=>{a.r(p),a.d(p,{UserModule:()=>Y});var l=a(6895),c=a(860),f=a(8098),u=a(8896),r=a(433),m=a(4405),t=a(8274),h=a(133),x=a(9430),v=a(5134),P=a(7458),C=a(605),w=a(5994);function _(o,s){if(1&o&&t._UZ(0,"img",15),2&o){const e=t.oxw();t.Q6J("src",e.user.avatarURL,t.LSH)}}function b(o,s){1&o&&t._UZ(0,"img",16)}function M(o,s){1&o&&(t.TgZ(0,"small"),t._uU(1,"Use at least 8 letters or numbers"),t.qZA())}function Z(o,s){if(1&o&&(t.TgZ(0,"div",17),t.YNc(1,M,2,0,"small",18),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.form.controls.password)}}function U(o,s){1&o&&(t.TgZ(0,"small"),t._uU(1,"Use at least 8 letters or numbers"),t.qZA())}function O(o,s){if(1&o&&(t.TgZ(0,"div",17),t.YNc(1,U,2,0,"small",18),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.form.controls.confirmPassword)}}function T(o,s){1&o&&(t.TgZ(0,"small",17),t._uU(1,"Both password must be equal"),t.qZA())}const g=function(o){return{invalid:o}};let A=(()=>{class o{constructor(e,n,i,d,y){this.fb=e,this.store=n,this.messages=i,this.loader=d,this.auth=y,this.submitted=!1,this.error=!1,this.avatarFile=null}ngOnInit(){this.loadUserData()}loadUserData(){this.store.currentUser$.subscribe(e=>this.user=e),this.form=this.fb.group({password:[null,[r.kI.required,r.kI.minLength(8),(0,m.U)()]],confirmPassword:[null,[r.kI.required,r.kI.minLength(8),(0,m.U)()]]})}changePassword(){const e=this.form.value;if(e.password!=e.confirmPassword)return this.error=!0;this.submitted=!0,this.store.updatePassword({password:e.password}).subscribe({next:()=>{this.submitted=!1,this.form.reset()},error:()=>this.submitted=!1})}addAvatar(e){this.loader.loadingOn(),this.avatarFile=e.target.files[0];const i={...this.auth.subject.getValue(),avatarURL:this.user.avatarURL};if(this.avatarFile)return this.store.updateAvatar(this.avatarFile).subscribe(()=>{this.auth.subject.next(i),this.loader.loadingOff()})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(r.qu),t.Y36(h.U),t.Y36(x.K),t.Y36(v.b),t.Y36(P.C))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-profile"]],decls:28,vars:18,consts:[[1,"profile"],[1,"profile-container"],["alt","avatar",3,"src",4,"ngIf"],["alt","avatar","src","./assets/images/avatarka.png",4,"ngIf"],[1,"btn"],["for","files"],["id","files","name","avatar","type","file",2,"display","none",3,"change"],[1,"profile__info"],[1,"profile__password"],[1,"form",3,"formGroup"],[1,"password-wrapper",3,"ngClass"],["formControlName","password","type","password","placeholder","Password","appPasswordToggle","",1,"form__input"],["class","validation",4,"ngIf"],["formControlName","confirmPassword","type","password","placeholder","Confirm password","appPasswordToggle","",1,"form__input"],[1,"btn",3,"disabled","click"],["alt","avatar",3,"src"],["alt","avatar","src","./assets/images/avatarka.png"],[1,"validation"],[4,"ngIf"]],template:function(e,n){1&e&&(t._UZ(0,"app-loader"),t.TgZ(1,"div",0)(2,"div",1),t.YNc(3,_,1,1,"img",2),t.YNc(4,b,1,0,"img",3),t.TgZ(5,"div",4)(6,"label",5),t._uU(7,"Select image"),t.qZA(),t.TgZ(8,"input",6),t.NdJ("change",function(d){return n.addAvatar(d)}),t.qZA()(),t.TgZ(9,"div",7)(10,"h3"),t._uU(11),t.qZA(),t.TgZ(12,"p"),t._uU(13),t.ALo(14,"date"),t.qZA(),t.TgZ(15,"p",8),t._uU(16,"\u0421hange password:"),t.qZA(),t.TgZ(17,"form",9)(18,"div",10),t._UZ(19,"input",11),t.YNc(20,Z,2,1,"div",12),t.qZA(),t.TgZ(21,"div",10),t._UZ(22,"input",13),t.YNc(23,O,2,1,"div",12),t.qZA(),t.TgZ(24,"div")(25,"button",14),t.NdJ("click",function(){return n.changePassword()}),t._uU(26," Save "),t.qZA()()(),t.YNc(27,T,2,0,"small",12),t.qZA()()()),2&e&&(t.xp6(3),t.Q6J("ngIf",n.user.avatarURL),t.xp6(1),t.Q6J("ngIf",!n.user.avatarURL),t.xp6(7),t.hij("Email: ",n.user.email,""),t.xp6(2),t.hij("Registration date: ",t.xi3(14,11,n.user.createdAt,"dd.MM.YYYY"),""),t.xp6(4),t.Q6J("formGroup",n.form),t.xp6(1),t.Q6J("ngClass",t.VKq(14,g,n.form.controls.password.touched&&n.form.controls.password.invalid)),t.xp6(2),t.Q6J("ngIf",n.form.controls.password.touched&&n.form.controls.password.invalid),t.xp6(1),t.Q6J("ngClass",t.VKq(16,g,n.form.controls.confirmPassword.touched&&n.form.controls.confirmPassword.invalid)),t.xp6(2),t.Q6J("ngIf",n.form.controls.confirmPassword.touched&&n.form.controls.confirmPassword.invalid),t.xp6(2),t.Q6J("disabled",!n.form.valid||n.submitted),t.xp6(2),t.Q6J("ngIf",n.error))},dependencies:[l.mk,l.O5,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,C.R,w.I,l.uU],styles:[".profile[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:50px;font-size:16px}.profile-container[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;padding:20px;background-color:#20b2ab1a;width:50%;border-radius:60px;box-shadow:5px 10px 15px #676c7899}.profile-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:50%;margin-bottom:20px;width:250px;height:250px;box-shadow:5px 10px 15px #676c7899}.profile__info[_ngcontent-%COMP%]{text-align-last:left;padding:10px}.profile__info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:10px}.profile__password[_ngcontent-%COMP%]{margin-top:10px}.btn[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:10px;font-size:16px;padding:10px 20px;text-align:center;background-color:#fff;border-radius:20px;cursor:pointer;box-shadow:5px 5px 10px #676c7866;transition:all .5s ease-out}.btn[_ngcontent-%COMP%]:hover{box-shadow:5px 5px 10px #676c7899}.form__input[_ngcontent-%COMP%]{border-radius:40px;border:1px solid lightseagreen;padding:10px 20px;width:75%;margin:10px 20px 0 0;box-shadow:0 10px 20px #676c7866;outline:none;font-size:16px}.form__input[_ngcontent-%COMP%]:focus{outline:2px solid lightseagreen}.validation[_ngcontent-%COMP%]{color:red;text-align:left}.form[_ngcontent-%COMP%]{margin-top:10px;display:flex;text-align:center}.password-wrapper[_ngcontent-%COMP%]{position:relative;min-height:70px}@media screen and (max-width: 480px){.profile[_ngcontent-%COMP%]{padding:10px}.profile-container[_ngcontent-%COMP%]{width:90%}.form[_ngcontent-%COMP%]{flex-direction:column}button[_ngcontent-%COMP%]{display:block;margin:0 auto}}@media screen and (min-width: 481px) and (max-width: 768px){.profile[_ngcontent-%COMP%]{padding:20px}.profile-container[_ngcontent-%COMP%]{width:80%}.form[_ngcontent-%COMP%]{flex-direction:column}button[_ngcontent-%COMP%]{display:block;margin:0 auto}}@media screen and (min-width: 769px) and (max-width: 1200px){.profile[_ngcontent-%COMP%]{padding:30px}.profile-container[_ngcontent-%COMP%]{width:60%}.form[_ngcontent-%COMP%]{flex-direction:column}button[_ngcontent-%COMP%]{display:block;margin:0 auto}}"],changeDetection:0}),o})();var J=a(4466);const I=[{path:"",component:A,canActivate:[f.a]}];let Y=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[f.a,u.e],imports:[l.ez,c.Bz.forChild(I),r.UX,r.u5,J.m,c.Bz]}),o})()}}]);