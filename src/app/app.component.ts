import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DummyPosts, Post } from '../models/post.model';
import { PostComponent } from './components/post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightPipe } from './shared/pipe/highlight.pipe';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HighlightPipe,
    RouterOutlet,
    PostComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>();

  constructor() {
    this.filteredPosts = [...this.posts];
  }
  searchText?: string;
  debounceTimeMs: number = 1000;
  posts: Post[] = DummyPosts;
  filteredPosts: Post[] = [];

  filterPosts(event: any) {
    if (this.searchText)
      this.searchSubject.next(this.searchText ?? '');
    else {
      this.filteredPosts = [...this.posts];
    }
  }

  performSearch(searchValue: string) {
    this.filteredPosts = this.posts.filter(post => post.content.toLowerCase().includes(searchValue.toLowerCase()) || post.title.toLowerCase().includes(searchValue.toLowerCase()))
    console.log(this.posts.filter(post => post.content.toLowerCase().includes(searchValue.toLowerCase()) || post.title.toLowerCase().includes(searchValue.toLowerCase())));

  }


  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue: string) => {
        this.performSearch(searchValue);
      });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

}
