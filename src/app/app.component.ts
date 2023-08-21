import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'angular-test-apollo-app';
  private apollo = inject(Apollo);

  constructor() {
    this.apollo
      .query({
        query: gql`
          query GetLocations {
            locations {
              id
              name
              description
              photo
            }
          }
        `,
      })
      .pipe(takeUntilDestroyed())
      .subscribe((result) => console.log(result));
  }
}
