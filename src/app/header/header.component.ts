import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
loggedIn: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
this.loggedIn = true;
        } else {
this.loggedIn = false;
        }
      }
    );
  }

  onSignOut() {
    this.authenticationService.signOutUser();
  }

}
