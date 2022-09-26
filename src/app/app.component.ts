import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'regisrationapp';
  //registerForm: FormGroup = new FormGroup({});
  registerForm: FormGroup

  constructor(private _toastr: ToastrService, private _fb : FormBuilder) {
    
   }

  ngOnInit() {

  }

  setFromState(){
    this.registerForm
  }

}
