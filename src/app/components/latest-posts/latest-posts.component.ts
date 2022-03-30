import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DatabaseService } from 'src/app/global/database.service';
import { BannerField, ImageField, Post, Star, TextField } from 'src/app/global/global-interfaces';
import { RatingService } from '../rating/rating.service';


interface Filter {
  copy: string;
  options?: string[],
  hasCustomOptions: boolean,
  customOptions?: string,
}

interface ActiveFilter {
  id: number;
  filter: string;
  copy?: string;
  rating?: Star[];
  dateType?: 'simple' | 'range'
}

interface RatingCalculations {
  count: number
}

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./range.scss', './latest-posts.component.scss']
})
export class LatestPostsComponent implements OnInit {
  year = new Date().getFullYear();
  posts: Post[] = [];
  unfilteredPosts: Post[] = [];
  needLoading = true;
  filters: Filter[] = [];
  filterOptionsShown = true;
  choosedFilter: Filter = {} as Filter;
  yearRange = "";
  searchControl = new FormControl();
  searchControlSub = new Subscription;
  filterRating: Star[] = []
  updatedRating: Star[] = [];
  activeFilters: ActiveFilter[] = [];
  searchQuery = "";
  specifedYear = "";
  rangeYear = "";

  constructor(private databaseService: DatabaseService, private ratingService: RatingService) {
    this.filterRating = this.initFilterRating();
    this.activeFilters.push({ id: 0, filter: 'category', copy: 'Category: All' },
      { id: 1, filter: 'rating', rating: this.filterRating },
      { id: 2, filter: 'year', copy: `Year: 1500 - ${this.year}`, dateType: 'range' })
  }

  ngOnInit(): void {
    this.checkForPosts();
    this.setUpFilters();

    this.searchControlSub = this.searchControl.valueChanges.pipe(
      debounceTime(1000)).subscribe(newValue => {
        this.searchQuery = newValue
        this.search();
      })

    this.ratingService.changedRatingValue.subscribe(value => {
      this.filterRating = value;
    })
  }

  initFilterRating() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({ id: i, filled: true, half: false })
    }

    return arr;
  }

  updateFilter() {
    this.addFilter('rating', '', JSON.parse(JSON.stringify(this.filterRating)));
  }

  search() {
    this.filterPosts();
  }

  async checkForPosts() {
    let postsArr = []
    let promise = await this.databaseService.getPosts().then(data => {
      this.posts = data;
      this.unfilteredPosts = data;
    });

    await setTimeout(() => this.needLoading = false, 750)
  }

  setUpFilters() {
    this.filters.push(
      {
        copy: 'Category',
        options: ['All', 'Movie', 'Serial', 'Game', 'Music'],
        hasCustomOptions: false,
      },
      {
        copy: 'Rating',
        hasCustomOptions: true,
        customOptions: 'rating',
      },
      {
        copy: 'Year',
        hasCustomOptions: true,
        customOptions: 'year',
      }
    )
  }

  chooseFilter(filter: Filter) {
    if (this.isCurrentFilter(filter)) {
      this.filterOptionsShown = true;

      setTimeout(() => {
        this.choosedFilter = {} as Filter;
      }, 300)
    }
    else {
      this.filterOptionsShown = false;
      this.choosedFilter = filter
      this.determineFilter();
    }
  }

  determineFilter(searchedFilter?: string) {
    if (this.choosedFilter.hasCustomOptions) {
      if (this.choosedFilter.customOptions === searchedFilter) {
        return true
      }
    }

    return false;
  }

  filterOptionsStyling() {
    let styling = "";

    if (!this.filterOptionsShown && (this.isCurrentFilter(this.filters[1]) || this.isCurrentFilter(this.filters[2]))) {
      styling = 'show filter-options-wrap-long';
    }
    else if (!this.filterOptionsShown && this.isCurrentFilter(this.filters[0])) {
      styling = 'show filter-options-wrap-max';
    }
    else if (this.filterOptionsShown) {
      styling = 'hide filter-options-wrap-min';
    }

    return styling;
  }

  isCurrentFilter(filter: Filter) {
    let compareArr: boolean[] = [];
    if (this.choosedFilter.options) {
      this.choosedFilter.options.forEach(option => {
        filter.options?.forEach(option2 => {
          if (option === option2) {
            compareArr.push(true)
          }
        })
      });

      return compareArr.length === filter.options?.length ? true : false;
    }
    else if (this.choosedFilter.hasCustomOptions) {
      return this.choosedFilter.customOptions === filter.customOptions ? true : false
    }

    return false
  }

  enterSpecificYear(val: string) {
    this.minVal.value = "";
    this.maxVal.value = "";
    this.firstRange.value = "0";
    this.secRange.value = "0";

    this.specifedYear = val;
  }

  filterYear() {
    const specificYearInput = document.querySelector(".filter-year-number") as HTMLInputElement;

    if (this.specifedYear !== "") {
      this.addFilter('year', this.specifedYear, [], 'simple');
    }
    else {
      specificYearInput.value = "";
      this.rangeYear = `${this.minVal.value}-${this.maxVal.value}`;
      this.addFilter('year', this.rangeYear, [], 'range');
    }

    this.specifedYear = "";
    this.rangeYear = "";
  }

  addFilter(category: string, copy?: string, rating?: Star[], yearType?: 'simple' | 'range') {
    let newFilter = { id: this.activeFilters.length - 1, filter: category, copy: copy, rating: rating } as ActiveFilter;

    if (category === 'year') {
      newFilter.dateType = yearType
    }

    this.activeFilters.forEach(filter => {
      if (filter.filter === newFilter.filter) {
        this.editAddedFilter(filter, newFilter);
      }
    });


    this.filterPosts();
  }

  filterPosts() {
    let filterCategory = this.activeFilters.filter(filter => filter.filter === 'category')[0];
    let filterRating = this.activeFilters.filter(filter => filter.filter === 'rating')[0];
    let filterYear = this.activeFilters.filter(filter => filter.filter === 'year')[0];

    this.posts.forEach(post => {
      if (!this.checkCategory(post.category, filterCategory.copy) || !this.checkRating(post.ratings, filterRating.rating) || !this.checkYear(post.year, filterYear.copy, filterYear.dateType) || !this.checkQuery(post.author, post.category, post.fields, post.title)) {
        post.hidden = true;
      }
      else {
        post.hidden = false;
      }
    });
  }

  checkCategory(postCategory: string, categoryToFilter: string | undefined) {
    if (categoryToFilter) {
      if (categoryToFilter.toLowerCase().includes(postCategory.toLowerCase()) || categoryToFilter === 'Category: All') {
        return true
      }
      return false
    }

    return false
  }

  checkYear(postYear: string, yearToFilter: string | undefined, type: 'simple' | 'range' | undefined) {
    if (yearToFilter) {
      if (type === 'range') {
        let range = yearToFilter.split(':')[1].split('-');
        console.log(range)
        if (Number(postYear) >= Number(range[0].trim()) && Number(postYear) <= Number(range[1].trim())) {
          return true
        }
      }
      else if (yearToFilter.includes(postYear)) {
        return true
      }
      return false
    }

    return false
  }

  checkRating(postRating: Star[], ratingToFilter: Star[] | undefined) {
    if (ratingToFilter) {
      if (this.compareRatings(postRating, ratingToFilter)) {
        return true
      }
      return false
    }

    return false
  }

  checkQuery(author: string, category: string, fields: (TextField | ImageField | BannerField)[], title: string) {
    if (title.toLowerCase().includes(this.searchQuery.toLowerCase())) {
      return true
    }
    else if (author.toLowerCase().includes(this.searchQuery.toLowerCase())) {
      return true
    }
    else if (fields.find(p => p.type === 'text' || p.type === 'banner')) {
      fields.forEach(p => {
        if (p.type === 'text' || p.type === 'banner') {
          if (p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || p.value.toLowerCase().includes(this.searchQuery.toLowerCase())) {
            return true
          }
        }

        return false
      })
    }

    return false
  }

  compareRatings(rating1: Star[], rating2: Star[]) {
    let ratings1Data = { count: 0 } as RatingCalculations;
    let ratings2Data = { count: 0 } as RatingCalculations;

    this.calculateRatingsData(rating1, ratings1Data);
    this.calculateRatingsData(rating2, ratings2Data);

    if (ratings1Data.count <= ratings2Data.count) {
      return true
    }

    return false
  }

  calculateRatingsData(ratings: Star[], ratingData: RatingCalculations) {
    ratings.forEach(rating => {
      if (rating.half) {
        ratingData.count += 0.5;
      }
      else if (rating.filled) {
        ratingData.count += 1;
      }
    });
  }

  editAddedFilter(existingFilter: ActiveFilter, newFilter: ActiveFilter) {
    if (newFilter.copy) {
      existingFilter.copy = `${newFilter.filter[0].toUpperCase() + newFilter.filter.slice(1,)}: ${newFilter.copy}`;

      if (newFilter.dateType) {
        existingFilter.dateType = newFilter.dateType
      }
    }
    else {
      existingFilter.rating = newFilter.rating;
    }

    this.filterPosts()
  }

  get minVal() {
    return document.querySelector(".min-val") as HTMLInputElement
  }

  get maxVal() {
    return document.querySelector(".max-val") as HTMLInputElement
  }

  get firstRange() {
    return document.querySelector(".first-range") as HTMLInputElement;
  }

  get secRange() {
    return document.querySelector(".second-range") as HTMLInputElement;
  }

  firstPostID() {
    let foundPost = this.posts.find(post => !post.hidden);

    return foundPost ? foundPost.id : 0;
  }

  updateRange() {
    this.firstRange.value = this.minVal.value;
    this.secRange.value = this.maxVal.value;
  }

  changeRange() {
    let slide1 = parseFloat(this.firstRange.value);
    let slide2 = parseFloat(this.secRange.value);

    if (slide1 > slide2) {
      [slide1, slide2] = [slide2, slide1];
    }

    this.minVal.value = String(slide1);
    this.maxVal.value = String(slide2);

    let values = [this.minVal, this.maxVal];
    values.forEach((el) => {
      el.oninput = () => {
        let number1 = parseFloat(this.minVal.value),
          number2 = parseFloat(this.maxVal.value);

        if (number1 > number2) {
          let tmp = number1;
          this.minVal.value = String(number2);
          this.maxVal.value = String(tmp);
        }

        this.firstRange.value = String(number1);
        this.secRange.value = String(number2);
      }
    });
  }
}