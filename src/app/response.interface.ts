export interface ResponseData {
    supplierinfo: SupplierInfo[];
    approv: Approval[];
}

export interface SupplierInfo {
    id: string;
    companyName: string;
    companyAddress: string;
    contactName: string;
    email: string;
    vendorcode: string;
    statecountry: string;
    telno: string;
    faxno: string;
    src: string;
}

export interface Approval {
    id: string;
    type: string;
    status: string;
    date: string;
}

export interface programInfo {
    companyLocation: string,
    abcpartno: string,
    abcpartdescr: string,
    partweight: string,
    partdimention: string,
    annualvolume: string,
    noofpartspervehicle: number,
    modelsapplicable: string,
}

export interface Id {
    id: string
}

export interface Images {
    imagesInfo: string[]
}

export interface approvalInfo {
    names: string[],
    dates: string[]
}