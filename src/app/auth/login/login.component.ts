import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      }, error => {
        this.error = error.error.error.message;
        this.isLoading = false;
      });
  }

  switchToSignup(): void {
    this.router.navigate(['/signup']).then();
    this.loginForm.reset();
  }
}
