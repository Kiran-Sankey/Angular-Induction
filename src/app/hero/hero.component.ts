import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { DisplayIdService } from '../service/display-id.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnChanges {

  oneObject: any;
  defaultImage: string = "https://imgs.search.brave.com/neBrELOnsfK49yJraJ6s05kKhr38cFT0UIFls9VbHr4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzM0LzgzLzIy/LzM2MF9GXzMzNDgz/MjI1NV9JTXh2ellS/eWdqZDIwVmxTYUlB/RlpyUVdqb3pRSDZC/US5qcGc";
  infoArray: any = [];
  nestedObject = {};
  miscComment: any;
  // userDate = '2024-03-21 12:00:00';
  // parseDate = this.utcDate.transform(this.userDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'UTC');

  supplierInfoArray: any;
  programPartInfoArray: any;
  approv: any;

  constructor(private getList: DisplayIdService, private route: Router, private currentRoute: ActivatedRoute, private dialog: MatDialog) {
    console.log(this.miscComment)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes",changes)
  }

  ngOnInit(): void {
    
    const Id = this.currentRoute.snapshot.paramMap.get('id');

    if (Id) {
      this.getList.fetchDataByID(Id).subscribe((res)=>{
        console.log("response in hero is : ", res);
        this.oneObject = res;
        this.supplierInfoArray = Object.entries(this.oneObject?.supplierInfo);
        this.programPartInfoArray = Object.entries(this.oneObject?.programInfo);
        this.approv = Object.entries(this.oneObject?.approv);
      })
      console.log("oneObject",this.oneObject);

    } else {
      alert("no data found");
    }
  }

  convertEpochToDate(epoch: number): string {
    const date = new Date(epoch * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Customize the output format as per your requirement
  }

  openModal(imageUrl: string): void {
    const dialogRef = this.dialog.open(ImageModalComponent, {
      width: 'fit-content',
      data: { imageUrl }
    });

  }

  navigateBack() {
    this.route.navigate(['']);
  }

  exportToExcel() {
    console.log(this.oneObject);
    const misObj = {
      'Miscellaneous Comment': this.miscComment
    }
    console.log(this.miscComment)
    this.infoArray.push(this.oneObject.approv, this.oneObject.supplierInfo, this.oneObject.programInfo, misObj);

    const concatenatedObject = Object.assign({}, ...this.infoArray);

    const ws = XLSX.utils.json_to_sheet([concatenatedObject]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'UserList.xlsx');
  }

  isNumeric(variable: any): boolean {
    return typeof variable === 'number';
  }
}
