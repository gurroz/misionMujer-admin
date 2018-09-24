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

  teachings: [Teaching];
  isAdding = false;
  isLoading = false;
  newTeaching: Teaching;
  categories: [Category];
  file: any;

  constructor(private teachingService: TeachingsService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.newTeaching = new Teaching();
    this.getTeachings();
    this.getCategories();
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }

  submitContent() {
    this.isLoading = true;
    if (this.file) {
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

      // adds the S3 service, make sure the api version and bucket are correct
      const s3 = new AWSService.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName}
      });

      s3.upload({ Key: this.file.name, Bucket: bucketName, Body: this.file, ACL: 'public-read'},  (err, data) => {
        if (err) {
          console.log(err, 'there was an error uploading your file');
        } else {
          this.newTeaching.file = data.Location;
          this.uploadTeaching();
        }
      });
    } else {
      this.uploadTeaching();
    }
  }

  uploadTeaching(): void {
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
  }

  deleteTeaching(TeachingsId: number): void {
    this.isLoading = true;
    this.teachingService.deleteTeachings(TeachingsId).subscribe( data => {
      this.getTeachings();
    });
  }

  editTeaching(teachings: Teaching): void {
    this.newTeaching = teachings;
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
      this.categories = data;
    });
  }

}
