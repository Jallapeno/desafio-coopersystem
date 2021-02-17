import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent {

  title = '...';

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.router.events.subscribe(
      (res) => {
        if (res instanceof ActivationEnd && res.snapshot.data.title) {
          this.title = res.snapshot.data.title;
        }
      }
    );
  }

}
