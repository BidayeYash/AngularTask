import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormService } from '../form.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  showSmallMenu: boolean = false;

  toggleNavbar() {
    this.showSmallMenu = !this.showSmallMenu;
  }
  homePage() {
    this.router.navigateByUrl('/home');
  }
  userProfilePage() {
    this.router.navigateByUrl('/userProfile');
  }
  users: any;
  constructor(
    private service: CommonService,
    public regForm: FormService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllUsers();
    this.GetAllUsers();
  }
  GetAllUsers() {
    this.service.GetAllUsers().subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // Get the last user object from the array
        this.users = data[data.length - 1];
        console.log('Last user:', this.users);
      } else {
        console.log('No users found.');
      }
    });
  }

  GetUserByID(id: any) {
    this.service.GetUserByID(id).subscribe((data) => {
      this.openDialog();

      this.regForm.registrationForm.patchValue({
        profileImage: data.profileImage,
        tags: data.tags,
        addressType: data.addressType,
        address1: data.address1,
        address2: data.address2,
        companyAddress1: data.companyAddress1,
        companyAddress2: data.companyAddress2,
        firstname: data.firstname,
        lastname: data.lastname,
        phoneNo: data.phoneNo,
        age: data.age,
        country: data.country,
        state: data.state,
        email: data.email,
      });
    });
  }

  //d27d
  openDialog() {
    const dialogRef = this.dialog.open(RegistrationModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.GetAllUsers();
      console.log(`Dialog result: ${result}`);
    });
  }
}
