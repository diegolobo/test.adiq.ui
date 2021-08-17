import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Security } from 'src/app/utils/security.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {

  }

  submit() {
    this.busy = true;
    this
      .service
      .authenticate(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          if (data.success)
            this.setUser(this.form.value, data);
          else
            alert(data.message);
        },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      );
  }

  setUser(user: any, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}