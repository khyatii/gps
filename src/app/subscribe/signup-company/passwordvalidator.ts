import { AbstractControl } from "@angular/forms";

export class PasswordValidator {

    static ValidPassword(control : AbstractControl){
        let password = control.get('password');
        let confirmpassword = control.get('confirmpassword');
        //console.log('password',password.value , 'confirmpassword' , confirmpassword.value)
        if(password.value !== confirmpassword.value)
            return{ValidPassword: true};
        
        else
           return{ValidPassword: false};
    }
}