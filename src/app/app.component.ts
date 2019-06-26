import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maSuperAgence';

  constructor() {
    // Web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyBcgveBprw9i673Tatx5e6wVQrW8P5DC8w',
      authDomain: 'masuperagence-df6f1.firebaseapp.com',
      databaseURL: 'https://masuperagence-df6f1.firebaseio.com',
      projectId: 'masuperagence-df6f1',
      storageBucket: '',
      messagingSenderId: '653667171783',
      appId: '1:653667171783:web:ad46bf2dc54c8cc5'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }
}
