import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { PasswordValidator } from 'src/app/shared/Validators/password-validator';
import { EmailValidator } from 'src/app/shared/Validators/email-validator';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  public form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder){
    //this.form = this.passVal();

  }

  ngOnInit(): void {
    this.create();
    this.passVal();
  }

  create(){
      this.form = this.fb.group({
        alpha: ['', Validators.required],
        alphanumeric: ['', Validators.required],
        numeric: ['', Validators.required],
        alphaspace: ['', Validators.required],
        withoutspace: ['', Validators.required],
        email: ['', [Validators.required, EmailValidator.isValidMailFormat]],
        cnic: ['', Validators.required],
        phone: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/,/\d/,/\d/,/\d/,/\d/,'-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
  };

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
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    // do signup or something
    console.log(this.form.value);
  }
  get f (){
    return this.form.controls;
  }

}
