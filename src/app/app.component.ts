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
      .subscribe({
        query: gql`
          subscription {
            alienChanged {
              name
            }
          }
        `,
        errorPolicy: 'all',
      })
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (result) => console.log('result :', result),
        error: (error) => console.log('error: ', error),
      });
  }
}
