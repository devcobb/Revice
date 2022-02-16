import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/global/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() formData: EventEmitter<LoginData> = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nickname: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get nickname() {
    return this.form.get('nickname');
  }

  onSubmit() {
    this.formData.emit(this.form.value);
  }


  handleNotEmptyInputs(event: Event) {
    let input = event.target as HTMLInputElement;

    if (input.value !== "") {
      input.className += " not-empty"
    }
    else {
      input.className = input.className.replace('not-empty', '');
    }
  }

  handleBlurInput(event: Event) {
    let input = event.target as HTMLInputElement;
    input.className += " blurred";
  }
}
