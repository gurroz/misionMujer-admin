import {Component, OnInit} from '@angular/core';
import {News} from './news.model';
import {NewsService} from './news.service';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsList: [News];
  isAdding = false;
  isLoading = false;
  newNews: News;
  file: any;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newNews = new News();
    this.getNews();
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
          this.newNews.image = data.Location;
          this.uploadCategory();
        }
      });
    } else {
      this.uploadCategory();
    }
  }

  uploadCategory(): void {
    if (this.newNews.id) { // UPDATE
      this.newsService.editNews(this.newNews).subscribe(resp => {
        this.isAdding = false;
        this.getNews();
      });
    } else {
      this.newsService.saveNews(this.newNews).subscribe(resp => {
        this.isAdding = false;
        this.getNews();
      });
    }
  }

  addingMode() {
    this.isAdding = true;
    this.newNews = new News();
  }

  deleteNews(newsId: number): void {
    this.isLoading = true;
    this.newsService.deleteNews(newsId).subscribe( data => {
      this.getNews();
    });
  }

  editNews(news: News): void {
    this.newNews = news;
    this.isAdding = true;
  }

  getNews(): void {
    this.newsService.getNews().subscribe(data => {
      this.newsList = data;
      this.isLoading = false;
    });
  }

}
