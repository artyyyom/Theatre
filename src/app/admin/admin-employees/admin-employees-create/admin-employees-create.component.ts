import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { EmployeesService } from '../../../shared/services/employees.service';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs/Observable';
import { UnitsService } from '../../../shared/services/units.service';
import { PositionsService } from '../../../shared/services/positions.service';
import { Positions } from '../../../shared/models/positions.model';
import { Units } from '../../../shared/models/units.model';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-admin-employees-create',
  templateUrl: './admin-employees-create.component.html',
  styleUrls: ['./admin-employees-create.component.css']
})
export class AdminEmployeesCreateComponent implements OnInit, OnDestroy {
  @ViewChild('fileInputPhoto') fileInputPhoto: FileUpload;
  @ViewChild('fileInputPhotos') fileInputPhotos: FileUpload;
  
  sub1: Subscription;
  fileName: any = [];
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  isSuccessPhoto: boolean = false;
  isErrorPhoto: boolean = false;
  isSuccessPhotos: boolean = false;
  isErrorPhotos: boolean = false;
  positions: Positions[];
  positionsSelect: Positions[];
  units: Units[];
  unitSelect: Units;
  isLoad: boolean = false;
  constructor(private employeesService: EmployeesService,
              private unitsService: UnitsService,
              private positionsService: PositionsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'middlename': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'birthday': new FormControl('', Validators.required),
      'bio': new FormControl('', Validators.required),
      'bioshort': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
    });
    this.sub1 = Observable.combineLatest(
      this.positionsService.getPositions(),
      this.unitsService.getUnits()
    ).subscribe((data: [Positions[], Units[]]) => {
      this.positions = data[0];
      this.units = data[1];
      if(this.units.length)
        this.unitSelect = this.units[0];
      this.isLoad = true;
    });
  
  }
  uploadPhoto() {
    if(this.fileInputPhoto.files.length) {
      let file: File = this.fileInputPhoto.files[0];
      let formData: FormData = new FormData();
      formData.append('photo', file, file.name);
      this.employeesService.upload(formData)
      .subscribe(data => {
        this.isSuccessPhoto = true;
      },
      error => {
        this.isErrorPhoto = true;
      });
    }

  }
  uploadPhotos() {
    let formData: FormData = new FormData();
    this.fileInputPhotos.files.forEach(file => {
      formData.append('photos[]', file, file.name);
    })
    this.employeesService.upload(formData)
    .subscribe(data => {
      this.isSuccessPhotos = true;
    }, error => {
      this.isErrorPhotos = true;
    });
  }


  OnSubmit(value) {
    let photo;
    if(this.fileInputPhotos.files.length)
      photo = this.fileInputPhoto.files[0].name;
    let photosObj = {
      photosStandart: []
    };
    this.fileInputPhotos.files.forEach(file => {
      photosObj.photosStandart.push(file.name);
    });

    let photos = JSON.stringify(photosObj);
    let data = {name: value.name, 
                surname: value.surname,
                middlename: value.middlename,
                address: value.address,
                birthday: value.birthday,
                biography: value.bio,
                biography_short: value.bioshort,
                mobile_number: value.phone,
                photo: photo,
                photos: photos,
                positions: this.positionsSelect,
                unit: this.unitSelect.id,       
               };
    this.sub1 = this.employeesService.addEmployee(data)
      .subscribe(data => {
        this.isSuccess = true;
        setTimeout(() => this.isSuccess = false, 4000);
      }, error => {
        this.isError = true;
        setTimeout(() => this.isError = false, 4000);
      });
    this.uploadPhoto();
    this.uploadPhotos();

    }

  ngOnDestroy() {
    if(this.sub1) 
      this.sub1.unsubscribe();
  }


}
