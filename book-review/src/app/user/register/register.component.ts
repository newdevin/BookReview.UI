import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators  } from '@angular/forms';

function checkPassword(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password');
    const repeatPassword = group.get('repeatPassword');

    if(password?.pristine ||repeatPassword?.pristine ){
      return null;
    }

    var result =  (password?.value == repeatPassword?.value) ? null : { nomatch: true };

    return result;
  }

  function hasDigits(value:string[]):boolean {
    return value.some(c=> c >= '0' && c <= '9');
  }

  function hasUpperCase(value:string[]):boolean{
    return value.filter(ch => isNaN(parseInt(ch))).some(ch=> ch==ch.toUpperCase());
  }

  function hasLowerCase(value:string[]):boolean{
    return value.filter(ch => isNaN(parseInt(ch))).some(ch=> ch==ch.toLowerCase());
  }

  function validPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const value = [...control.value];
    let result = null;

    if( hasDigits(value) && hasUpperCase(value) && hasLowerCase(value)){
      result = null;
    } else{
      result = {notmeets:true};
    }

    return result;

  }


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  passwordGroup:FormGroup = this.fb.group({
    password: ['',[Validators.required, Validators.minLength(8), validPassword]],
    repeatPassword: ['',[Validators.required,Validators.minLength(8)]]
  },{validators: checkPassword});

  registerForm: FormGroup = this.fb.group({
    firstName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email,]],
    passwordGroup : this.passwordGroup
  });

  ngOnInit(): void {
    //this.passwordGroup.setValidators(checkPassword);
  }

  save(){

  }

}


