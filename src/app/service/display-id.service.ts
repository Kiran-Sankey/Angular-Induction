import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.interface';
import { myVariables } from '../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { VariableBinding } from '@angular/compiler';
@Injectable({
    providedIn: 'root'
})
export class DisplayIdService {

    packingDetails: any;
    allObjects: any;
    singleDetail:any;

    constructor(private http: HttpClient
    ) {

    }

    fetchData(): Observable<object | undefined> {
        this.packingDetails = this.http.get<object>(myVariables.myAPI);
        // console.log(JSON.stringify(this.packingDetails) + 'this.packingDetails');
        return this.packingDetails;
    };

    getSingleDetail(){
        return this.singleDetail;
    }

    setSingleDetail(newData: any){
        this.singleDetail = newData;
    }

    // fetchDataUsingID(id: string) {

    //     console.log("page refreshed, curent id is : ", id);
    //     if(this.allObjects)
    //     {
    //         console.log("this is id----------->", id, this.allObjects);
    //         this.singleDetail = this.allObjects.find((item: any) => item.id === id);
    //         console.log(this.singleDetail + 'fetched latest in if')
    //     }
    //     else{
    //         this.fetchData().subscribe((data)=>{

    //             console.log("222222222",data)
    //             this.allObjects = data;
    //             this.singleDetail = this.allObjects.find((item: any) => item.id === id);
                
    //             this.setSingleDetail(this.singleDetail);
    //             // return this.singleDetail;
    //             console.log(JSON.stringify(this.singleDetail) + 'fetched latest in else');
    //             // this.cdr.detectChanges();ss
    //         });   
    //     }
    //     return this.singleDetail;
    // }
    postUserData(data: User): Observable<object | undefined> {
        return this.http.post(myVariables.myUserAPI, data);
    }

    getUserData(): Observable<object | undefined> {
        return this.http.get(myVariables.myUserAPI);
    }

    // it was just a matter of 2 lines 😅
    fetchDataByID(Id : string){
        return this.http.get(myVariables.myAPI + '/'+ Id);
    }
        
}
