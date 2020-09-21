import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PasswordValidator } from 'src/app/shared/Validators/password-validator';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder){
    //this.form = this.passVal();

  }

  ngOnInit(): void {
    this.create();
    this.passVal()
  }

  create(){
      this.form = this.fb.group({
        alpha: [''],
        alphanumeric: [''],
        numeric: [''],
        alphaspace: [''],
        cnic: [''],
        phone: [''],
        username: [''],
        password: ['']
      })
  }

  passVal(): FormGroup{
    return this.fb.group(
      {
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            PasswordValidator.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            PasswordValidator.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            PasswordValidator.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            PasswordValidator.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],         
      }
    );
  }

  submit() {
    // do signup or something
    console.log(this.form.value);
  }
  // get f (){
  //   return this.form.controls;
  // }

}
