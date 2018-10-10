import {Component, OnInit} from '@angular/core';
import {CategoriesService} from './categories.service';
import {Category} from './category.model';
import * as AWS from 'aws-sdk';
import {ImageOptimizationService} from '../util/image-optimization.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: [Category];
  isAdding = false;
  isLoading = false;
  newCategory: Category;
  file: any;

  constructor(private categoryService: CategoriesService, private imageOptimizationService: ImageOptimizationService) { }

  ngOnInit() {
    this.newCategory = new Category();
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
          this.newCategory.image = data.Location;
          this.uploadCategory();
          this.imageOptimizationService.optimizeImages(data.Location);
        }
      });
    } else {
      this.uploadCategory();
    }
  }

  uploadCategory(): void {
    if (this.newCategory.id) { // UPDATE
      this.categoryService.editCategory(this.newCategory).subscribe(resp => {
        this.isAdding = false;
        this.getCategories();
      });
    } else {
      this.categoryService.saveCategories(this.newCategory).subscribe(resp => {
        this.isAdding = false;
        this.getCategories();
      });
    }
  }

  addingMode() {
    this.isAdding = true;
    this.newCategory = new Category();
  }

  deleteCategory(categoryId: number): void {
    this.isLoading = true;
    this.categoryService.deleteCategories(categoryId).subscribe( data => {
      this.getCategories();
      console.log('Category deleted');
    });
  }

  editCategory(category: Category): void {
    this.newCategory = category;
    this.isAdding = true;
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.isLoading = false;
    });
  }
}
