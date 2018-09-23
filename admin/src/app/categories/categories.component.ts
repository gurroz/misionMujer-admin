import { Component, OnInit } from '@angular/core';
import {CategoriesService} from './categories.service';
import {Category} from './category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: [Category];

  constructor(private categoryService: CategoriesService) { }

  ngOnInit() {
  this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log('Categories are', this.categories);
    });
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }
}
