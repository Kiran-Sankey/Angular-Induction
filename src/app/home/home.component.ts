import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../service/localstorage.service';
import { DisplayIdService } from '../service/display-id.service';
import { User } from '../user.interface';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})

export class HomeComponent implements OnInit, OnChanges {

  storeObjects: any; // store all the objects here -> apply filter on this
  storeIds: any; // changing it on runtime

  search: string = '';
  displayUsers: any;
  currentUser: User | undefined;


  toastOptions: Partial<IndividualConfig> = {
    positionClass: 'toast-bottom-right'
  };


  constructor(private displayID: DisplayIdService, private toastr: ToastrService, private http: HttpClient, private saveToStorage: LocalStorageService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getData();

    this.displayID.fetchDataByID('1').subscribe((res)=>{
      console.log("Resonse with id is : ", res);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if the search value has changed
    if (changes['search']) {
      if (!changes['search'].currentValue) {
        this.storeObjects = this.storeIds;
      }
      alert("everything was loaded first")
    }
  }
  getData() {
    this.displayID.fetchData().subscribe((res) => {
      console.log("response from mock api : ", res);
      this.storeObjects = res; // store all object here
      this.storeIds = res;
      this.displayID.allObjects = res;
      this.cdr.detectChanges();
    })
  }

  filterData() {

    if (this.search.length > 5) {
      alert("Search Lenght Limit Exceeded !! Search text should be less than 5 characters..");
    }
    else {

      this.storeObjects = this.storeIds;

      let filterDataById = this.storeObjects.filter((item: any) => item.id === this.search);


      if (filterDataById.length != 0) {
        this.storeObjects = filterDataById;
        this.toastr.success('Fetched Records Successfully', 'Success,', this.toastOptions);
        console.log("I have found the details ", filterDataById);
      }

      if (filterDataById.length == 0) {
        this.toastr.error('Please enter valid record !! Record not found', 'Error', this.toastOptions);
        console.log("I have not found the details");
      }
    }
  }

  getUserData(data: { name: string, email: string, password: string }) {

    if (data.password.length < 8 && data.email == '' && data.name == '') {
      alert("Please Enter Valid Credentials");
    }
    else {
      this.currentUser = data;
      console.log(this.currentUser, 'is current user ');
      // send data to url 
      this.displayID.postUserData(data).subscribe((res) => {
        console.log("Data stored successfully..", res);
        this.toastr.success("User saved successfully !!", 'Success', this.toastOptions);
        this.saveToStorage.storeEncryptedUserData(data);
      })

      // get data from url
      this.displayID.getUserData().subscribe((res) => {
        console.log("All the users are : ", res);
        this.displayUsers = res;
      })

    }

    this.saveToStorage.decryptData();
  }
}


