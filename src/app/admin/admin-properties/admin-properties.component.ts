import { Property } from './../../model/Property.model';
import { PropertiesService } from './../../services/properties.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit, OnDestroy {

propertyForm: FormGroup;
propertiesSubscription: Subscription ;
properties: Property[];

  constructor(private formBuilder: FormBuilder,
              private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.initForm();
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (properties: Property[]) => {
        this.properties = properties;
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  initForm() {
    this.propertyForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: ['', Validators.required],

    });
  }

  onSaveProperty() {
    const title = this.propertyForm.get('title').value;
    const category = this.propertyForm.get('category').value;
    const surface = this.propertyForm.get('surface').value;
    const rooms = this.propertyForm.get('rooms').value;
    const description = this.propertyForm.get('description').value;
    console.log(this.propertyForm.value);
    const newProperty = new Property(title, category, surface, rooms, description);
    this.propertiesService.createProperty(newProperty);
    $('#propertiesFormModal').modal('hide');
    this.propertyForm.reset();
  }
  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();
  }
}