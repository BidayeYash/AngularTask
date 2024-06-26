import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router, RouterModule } from '@angular/router';
import { FormService } from '../form.service';
import { Fruit } from '../fruit';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import {MatChipInputEvent,MatChipEditedEvent,MatChip,MatChipsModule,} from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatSliderModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    MatChip,
    ReactiveFormsModule,
    FormsModule,
    MatOption,
    HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  [x: string]: any;
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;

  users: any;

  // Submitting the form code

  constructor(
    private fb: FormBuilder,
    private service: CommonService,
    private router: Router,
    public regForm: FormService,
    public renderer: Renderer2,
    public el: ElementRef
  ) {
    //changes input fields of address according to type given
    this.regForm.registrationForm
      .get('addressType')
      .valueChanges.subscribe((addressType: any) => {
        if (addressType === 'home') {
          this.regForm.registrationForm.get('companyAddress1').disable();
          this.regForm.registrationForm.get('companyAddress2').disable();
          this.regForm.registrationForm.get('address1').enable();
          this.regForm.registrationForm.get('address2').enable();
        } else if (addressType === 'company') {
          this.regForm.registrationForm.get('companyAddress1').enable();
          this.regForm.registrationForm.get('companyAddress2').enable();
          this.regForm.registrationForm.get('address1').disable();
          this.regForm.registrationForm.get('address2').disable();
        }
      });
  }

  ngOnInit(): void {}
  // firstName
  get firstname() {
    return this.regForm.registrationForm.controls['firstname'];
  }
  // Register Method
  registerUser() {
    var type = this.regForm.registrationForm.value.id;
    this.service
      .AddUpdateUser(this.regForm.registrationForm.value)
      .subscribe((data) => {
        this.regForm.registrationForm.reset();

        // console.log(data);
      });

    // Add dismiss attribute after a delay
  }

  // Image to base64

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.convertToBase64(file);
    }
  }

   convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.regForm.registrationForm.patchValue({
          profileImage: reader.result,
        });
        this.validateImageSize(reader.result);
      }
    };
  }
//------- image validation------//

  validateImageSize(base64String: string) {
    const img = new Image();
    img.src = base64String;
    img.onload = () => {
      if (img.width === 310 && img.height === 325) {
        this.regForm.registrationForm.get('profileImage').setErrors(null);
      } else {
        this.regForm.registrationForm
          .get('profileImage')
          .setErrors({ invalidImageSize: true });
      }
    };
  }

  //------- Slider Input ---------//

  formatLabel(value: number): string {
    if (value >= 1) {
      return Math.round(value / 1) + '';
    }

    return `${value}`;
  }

  //Close Modal //

  closeModal() {
    const modalDiv = document.getElementById('modal');
    if (modalDiv != null) {
      modalDiv.style.zIndex = '1000000';
    }
  }

  //-------- Tags input --------------//
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [
    { name: 'Hockey' },
    { name: 'Football' },
    { name: 'Cricket' },
  ];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }

  userProfilePage() {
    this.router.navigateByUrl('/userInfo');
  }

  //dismiss method
  addDismissAttribute() {
    const buttonElement = this.el.nativeElement.querySelector('.submit');
    if (buttonElement) {
      this.renderer.setAttribute(buttonElement, 'data-dismiss', 'modal');
    }
  }

  // // ---------- Image input ------------//
  imageURL!: string;

  showPreview(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.regForm.registrationForm.patchValue({
        profileImage: file,
      });
      this.regForm.registrationForm
        .get('profileImage')
        .updateValueAndValidity();
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  //toast
}

