import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      // Define your form controls here
      // In this example, we're using a FormArray to dynamically add/remove form controls
      emails: this.fb.array([ this.createEmail() ])
    });
  }

  // Helper method to create a new email FormControl
  createEmail(): FormGroup {
    return this.fb.group({
      email: ['', Validators.email]
    });
  }

  // Getter to access the FormArray
  get emailForms() {
    return this.myForm.get('emails') as FormArray;
  }

  // Method to add a new email field
  addEmail() {
    this.emailForms.push(this.createEmail());

    console.log(this.myForm.value);
    
  }

  // Method to remove an email field
  removeEmail(index: number) {
    this.emailForms.removeAt(index);
  }
}
