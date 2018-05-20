import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Employees } from '../../../shared/models/employees.model';
import { EmployeesService } from '../../../shared/services/employees.service';
import { PerformancesService } from '../../../shared/services/performances.service';
import { Observable } from 'rxjs/Observable';
import { Performances } from '../../../shared/models/performances.model';

@Component({
  selector: 'app-admin-performances-create',
  templateUrl: './admin-performances-create.component.html',
  styleUrls: ['./admin-performances-create.component.css']
})
export class AdminPerformancesCreateComponent implements OnInit, OnDestroy {

  @ViewChild('fileInputPhoto') fileInputPhoto: FileUpload;
  @ViewChild('fileInputPhotos') fileInputPhotos: FileUpload;
  @ViewChild('inputRole') inputRole: ElementRef;
  inputRoles: any = [];
  sub1: Subscription;
  fileName: any = [];
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  isSuccessPhoto: boolean = false;
  isErrorPhoto: boolean = false;
  isSuccessPhotos: boolean = false;
  isErrorPhotos: boolean = false;
  employees: Employees[];
  employeesSelect: Employees[];
  isLoad: boolean = false;
  selectItem: any = [];
  constructor(private employeesService: EmployeesService,
              private performancesService: PerformancesService,
              private fb: FormBuilder,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'genre': new FormControl('', Validators.required),
      'duration': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'author': new FormControl('', Validators.required),
      'age_restrict': new FormControl('', Validators.required),
      'employee_roles': this.fb.array([

      ]),
    
    });
    
    this.sub1 = Observable.combineLatest(
      this.employeesService.getEmployees(),
    ).subscribe((data: [Employees[]]) => {
      this.employees = data[0];
      this.isLoad = true;
    });
  
  }
  initRoles(value: any = {}) {
    return this.fb.group({
      id: value.id,
      name: '',
      surname: value.surname,
      nam: value.name
    });
  }
  change(event) {
    this.selectItem.push(event.itemValue);
    let i = 0;
    let pos = 0;
    event.value.forEach((value, index) => {
      if(event.itemValue.id == value.id) {
        i++;
        pos = index;
      }    
    });
    console.log(i);
    if(!i) {
      this.removeRoles(pos);
    }
    else {
      this.addRoles(event.itemValue);
    }
  }
  addRoles(value) {
    (<FormArray>this.dataform.get('employee_roles')).push(
      this.initRoles(value)
    )   
  }

  removeRoles(i: number) {
    (<FormArray>this.dataform.get('employee_roles')).removeAt(i);
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
    console.log(value);
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
                genre: value.genre,
                duration: value.duration,
                description: value.description,
                photo_main: photo,
                photos: photos,
                author: value.author,
                age_restrict: value.age_restrict,
                employees: value.employee_roles
               };
    this.sub1 = this.performancesService.addPerformance(data)
      .subscribe(data => {
        this.isSuccess = true;
        setTimeout(() => this.isSuccess = false, 4000);
      }, error => {
        this.isError = true;
        setTimeout(() => this.isError = false, 4000);
      });
    this.uploadPhoto();
    this.uploadPhotos();
    console.log(this.employeesSelect);

    }

  ngOnDestroy() {
    if(this.sub1) 
      this.sub1.unsubscribe();
  }

}
