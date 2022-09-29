import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DBOperation } from './-helpers/db-operations';
import { MustMatch } from './-helpers/must-match.validator';
import { User } from './-helpers/user.interface';
import { UserService } from './-helpers/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'regisrationapp';
  //registerForm: FormGroup = new FormGroup({});
  registerForm: FormGroup
  users: User[] = [];
  submitted: boolean = false;

  buttonText: string = "Submit";
  dbops: DBOperation;

  constructor(private _toastr: ToastrService, private _fb: FormBuilder, private _userservice: UserService) {

  }

  ngOnInit() {
    this.setFromState();
    this.getAllUsers();

  }

  setFromState() {
    this.buttonText = "submit";
    this.dbops = DBOperation.create;
  }
    this.registerForm = this._fb.group({
    id: [0],
    title: ['', Validators.required],
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    dob: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmPassword: ['', Validators.required],
    acceptTerms: [false, Validators.required]
    },{
      Validators : MustMatch('password','confirmPassword')

  });

  }

  get f(){
  return this.registerForm.contrlos;
}

onSubmit() {
  this.submitted = true;

  console.log()

  if (this.registerForm.invalid) {
    return
  }

  switch (this.dbops) {
    case DBOperation.create:
      this._userservice.addUser(this.registerForm.value).subscribe(res =>){
        this.toastr.success("User Added !!", "User Registration");
        this.getAllUsers();
        this.onCancel();
      });
      break;
    case DBOperation.update:
      this._userservice.updateUser(this.registerForm.value).subscribe(res =>){
        this.toastr.success("User Updated !!", "User Registration");
        this.getAllUsers();
        this.onCancel();
      });

      break;

  }

  onCancel() {
    this.registerForm.reset();
    this.buttonText = "Submit";
    this.dbops = DBOperation.create;
    this.submitted = false;
  }

  getAllUsers() {
    this._userservice.getUsers().subscribe((res: User[]) => {
      this.users = res;
      console.log(res);

    });

  }

  Edit(userId: number) {
    this.buttonText = "Update";
    this.dbops = DBOperation.update;

    let user = this.users.find((u: User) => u.id === userId);
    this.registerForm.patchValue(user);

    this.registerForm.get('password').setValue('');
    this.registerForm.get('confirmPassword').setValue('')
    this.registerForm.get('acceptTerms').setValue(false)

  }

}
Delete(userId: number) {
  this._userservice.deleteUser(userId).subscribe(res => {
    this.getAllUsers();
    this._toastr.success("Deleted Sucess !!", "User Registration");
  });
}
function f() {
  throw new Error('Function not implemented.');
}

