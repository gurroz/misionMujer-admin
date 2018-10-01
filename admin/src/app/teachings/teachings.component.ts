import {Component, OnInit} from '@angular/core';
import {Teaching} from './teaching.model';
import * as AWS from 'aws-sdk';
import {TeachingsService} from './teachings.service';
import {Category} from '../categories/category.model';
import {CategoriesService} from '../categories/categories.service';

@Component({
  selector: 'app-teachings',
  templateUrl: './teachings.component.html',
  styleUrls: ['./teachings.component.css']
})
export class TeachingsComponent implements OnInit {

  teachings: Teaching[];
  isAdding = false;
  isLoading = false;
  newTeaching: Teaching;
  categoriesChk: ChkCategory[];
  originalCategoriesChk: ChkCategory[];
  file: any;
  imageFile: any;

  constructor(private teachingService: TeachingsService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.newTeaching = new Teaching();
    this.getTeachings();
    this.getCategories();
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }

  onImageFileChanged(event) {

    this.imageFile = event.target.files[0];
  }

  selectedOptions(): Category[] {
    return this.categoriesChk
      .filter(opt => opt.checked)
      .map(data => data.category);
  }

  submitContent() {
    this.isLoading = true;
    const AWSService = AWS;
    const region = 'us-east-1';
    const bucketName = 'misionmujerbucket';
    const IdentityPoolId = 'us-east-1:ad5897aa-d131-4333-9a80-e74dd375c7f1';

    // Configures the AWS service and initial authorization
    AWSService.config.update({
      region: region,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      })
    });

    const s3 = new AWSService.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: bucketName}
    });

    if (this.file) {
      s3.upload({ Key: this.file.name, Bucket: bucketName, Body: this.file, ACL: 'public-read'},  (err, data) => {
        if (err) {
          console.log(err, 'there was an error uploading your file');
        } else {
          this.newTeaching.file = data.Location;
          if (this.imageFile) {
            s3.upload({Key: this.imageFile.name, Bucket: bucketName, Body: this.imageFile, ACL: 'public-read'}, (err2, data2) => {
              if (err2) {
                console.log(err2, 'there was an error uploading your image file');
              } else {
                this.newTeaching.image = data2.Location;
                this.uploadTeaching();
              }
            });
          } else {
            this.uploadTeaching();
          }
        }
      });
    }  else if (this.imageFile) {
      s3.upload({ Key: this.imageFile.name, Bucket: bucketName, Body: this.imageFile, ACL: 'public-read'},  (err, data) => {
        if (err) {
          console.log(err, 'there was an error uploading your image file');
        } else {
          this.newTeaching.image = data.Location;
          this.uploadTeaching();
        }
      });
    } else {
      this.uploadTeaching();
    }
  }

  uploadTeaching(): void {
    console.log('Sending teachings', this.newTeaching);
    this.newTeaching.categories = this.selectedOptions();
    if (this.newTeaching.id) { // UPDATE
      this.teachingService.editTeachings(this.newTeaching).subscribe(resp => {
        this.isAdding = false;
        this.getTeachings();
      });
    } else {
      this.teachingService.saveTeachings(this.newTeaching).subscribe(resp => {
        this.isAdding = false;
        this.getTeachings();
      });
    }
  }

  addingMode() {
    this.isAdding = true;
    this.newTeaching = new Teaching();
    this.categoriesChk = this.originalCategoriesChk.map(x => Object.assign({}, x));
  }

  deleteTeaching(TeachingsId: number): void {
    this.isLoading = true;
    this.teachingService.deleteTeachings(TeachingsId).subscribe( data => {
      this.getTeachings();
    });
  }

  editTeaching(teachings: Teaching): void {
    this.newTeaching = teachings;
    this.categoriesChk = this.categoriesChk.map(e => {
      if (this.newTeaching.categories.map(i => i.name).indexOf(e.category.name)) {
        e.checked = true;
      } else {
        e.checked = false;
      }
      return e;
    });

    this.isAdding = true;
  }

  getTeachings(): void {
    this.teachingService.getTeachings().subscribe(data => {
      this.teachings = data;
      this.isLoading = false;
    });
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(data => {
      this.categoriesChk  = data.map(function(e) {
        const chkOb = new ChkCategory();
        chkOb.category = e;
        chkOb.checked = false;
        return chkOb;
      });

      this.originalCategoriesChk = this.categoriesChk.map(x => Object.assign({}, x));
    });
  }

}

export class ChkCategory {
  category: Category;
  checked: boolean;

}
