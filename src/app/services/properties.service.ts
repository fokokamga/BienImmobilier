import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Property } from '../model/Property.model';



@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];
  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }
  createProperty(newProperty: Property) {
    this.properties.push(newProperty);
    this.saveProperties();
    this.emitProperties();
  }

  removeProperty(property: Property) {}
}
