import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Positions } from '../../../shared/models/positions.model';
import { Units } from '../../../shared/models/units.model';
import { EmployeesService } from '../../../shared/services/employees.service';
import { UnitsService } from '../../../shared/services/units.service';
import { PositionsService } from '../../../shared/services/positions.service';
import { Observable } from 'rxjs/Observable';
import { Employees } from '../../../shared/models/employees.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-employees-edit',
  templateUrl: './admin-employees-edit.component.html',
  styleUrls: ['./admin-employees-edit.component.css']
})
export class AdminEmployeesEditComponent implements OnInit, OnDestroy {

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
  employee: Employees;
  positions: Positions[];
  positionsSelect: Positions[];
  units: Units[];
  unitSelect: Units;
  isLoad: boolean = false;
  routeId: number;
  constructor(private employeesService: EmployeesService,
              private unitsService: UnitsService,
              private positionsService: PositionsService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.sub1 = Observable.combineLatest(
      this.positionsService.getPositions(),
      this.unitsService.getUnits(),
      this.employeesService.getEmployee(this.routeId)
    ).subscribe((data: [Positions[], Units[], Employees]) => {
      this.positions = data[0];
      this.units = data[1];
      this.employee = data[2];
      this.dataform = this.fb.group({
        'name': new FormControl(this.employee.name, Validators.required),
        'surname': new FormControl(this.employee.surname, Validators.required),
        'middlename': new FormControl(this.employee.middlename, Validators.required),
        'address': new FormControl(this.employee.address, Validators.required),
        'birthday': new FormControl(this.employee.birthday, Validators.required),
        'bio': new FormControl(this.employee.biography, Validators.required),
        'bioshort': new FormControl(this.employee.biography_short, Validators.required),
        'phone': new FormControl(this.employee.mobile_number, Validators.required),
      });
      this.unitSelect = this.employee.unit;
      this.deletePositionEmployeePivot();
      console.log(this.unitSelect);
      console.log(this.units);
      this.isLoad = true;
    });
  
  }

  deletePositionEmployeePivot() {
    this.positionsSelect = this.employee.positions;
    this.positionsSelect.forEach((roleSelect,i) => {
      delete this.positionsSelect[i].pivot;   
    });
    this.positions.forEach((position, i) => {
      delete this.positions[i].employees;   
    });
    this.units.forEach((unit, i) => {
      delete this.units[i].is_parent
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
    let photos;
    if(this.fileInputPhoto.files.length)
      photo = this.fileInputPhoto.files[0].name;
    let photosObj = {
      photosStandart: []
    };
    this.fileInputPhotos.files.forEach(file => {
      photosObj.photosStandart.push(file.name);
    });
    
    if(photo == undefined)
      photo = this.employee.photo_main;
    if(!photosObj.photosStandart.length)
     photos = this.employee.photos;
    else 
      photos = JSON.stringify(photosObj);
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
    console.log(data);
    this.sub1 = this.employeesService.updateEmployee(this.routeId, data)
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
