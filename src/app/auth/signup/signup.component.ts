import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  signUpForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  switchToLogin(): void {
    this.router.navigate(['/login']).then();
    this.signUpForm.reset();
  }

  private initForm(): void {

    this.signUpForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.signUpForm.value);
    this.authService.signup(this.signUpForm.value.email, this.signUpForm.value.password)
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        console.log(error);
      });

    this.signUpForm.reset();
  }
}
