import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FileUpload } from 'primeng/fileupload';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Employees } from '../../../shared/models/employees.model';
import { EmployeesService } from '../../../shared/services/employees.service';
import { Performances } from '../../../shared/models/performances.model';
import { PerformancesService } from '../../../shared/services/performances.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-performances-edit',
  templateUrl: './admin-performances-edit.component.html',
  styleUrls: ['./admin-performances-edit.component.css']
})
export class AdminPerformancesEditComponent implements OnInit, OnDestroy {

  @ViewChild('fileInputPhoto') fileInputPhoto: FileUpload;
  @ViewChild('fileInputPhotos') fileInputPhotos: FileUpload;
  @ViewChild('form') form;
  
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
  performance: Performances;
  employeesSelect: Employees[];
  routeId: number;
  isLoad: boolean = false;
  selectItem: any = []; 
    constructor(private employeesService: EmployeesService,
              private performancesService: PerformancesService,
              private fb: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    
    this.sub1 = Observable.combineLatest(
      this.employeesService.getEmployees(),
      this.performancesService.getPerformance(this.routeId)
    ).subscribe((data: [Employees[], Performances]) => {
      this.employees = data[0];
      this.performance = data[1];
      this.employeesSelect = this.performance.employees;
      this.employees.forEach((employee, i) => {
        delete this.employees[i].positions;
        this.employees[i].pivot = {employee_id: null, performance_id: null, role: null};
      });
      this.employees.forEach((employee, i) => {
        this.employeesSelect.forEach(employeeSelect => {
          if(employee.id == employeeSelect.id)
            this.employees[i].pivot = employeeSelect.pivot;
        })
      });
      
      console.log(this.employeesSelect);
      console.log(this.employees);  
      this.dataform = this.fb.group({
        'name': new FormControl(this.performance.name, Validators.required),
        'genre': new FormControl(this.performance.genre, Validators.required),
        'duration': new FormControl(this.performance.duration, Validators.required),
        'description': new FormControl(this.performance.description, Validators.required),
        'author': new FormControl(this.performance.author, Validators.required),
        'age_restrict': new FormControl(this.performance.age_restrict, Validators.required),
        'employee_roles': this.fb.array([

        ]),
      });
      this.employeesSelect.forEach(employeeSelect => {
        this.addRoles(employeeSelect);
        this.selectItem.push(employeeSelect);
      });
      this.isLoad = true;
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
  initRoles(value: any = {}) {
    return this.fb.group({
      id: value.id,
      name: value.pivot.role,
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
        setTimeout(() => this.isSuccessPhoto = false, 4000);
      },
      error => {
        this.isErrorPhoto = true;
        setTimeout(() => this.isErrorPhoto = false, 4000);
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
      setTimeout(() => this.isSuccessPhotos = false, 4000);
    }, error => {
      this.isErrorPhotos = true;
      setTimeout(() => this.isErrorPhotos = false, 4000);
    });
  }


  OnSubmit(value) {
    let photo;
    console.log(photo);
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
      photo = this.performance.photo_main;
    if(!photosObj.photosStandart.length)
     photos = this.performance.photos;
    else 
      photos = JSON.stringify(photosObj);
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
    this.sub1 = this.performancesService.updatePerformance(this.routeId, data)
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
