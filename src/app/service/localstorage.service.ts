import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { myVariables } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  userArray:string[] = [];
  
  constructor() { }
  storeEncryptedUserData(data: { name: string, email: string, password: string }) {
    
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), myVariables.myKey).toString();
    console.log("encrypted user is : ", encryptedData);
    this.userArray?.push(encryptedData);
    localStorage.setItem('encryptedUserData', JSON.stringify(this.userArray));

    // const decryptBytes = CryptoJS.AES.decrypt(encryptedData, myVariables.myKey);
    // const decryptedData = JSON.parse(decryptBytes.toString(CryptoJS.enc.Utf8));
    // console.log("Decrypted data is : ", decryptedData);
  }

  decryptData(){
    const encryptedData = localStorage.getItem('encryptedUserData');

    console.log("current data of users is : ", encryptedData);

  //  if(encryptedData != null)
  //  {
  //   for(let data of encryptedData){

  //   }
  //  }
  }
}
