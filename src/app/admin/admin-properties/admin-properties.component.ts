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
editProperty = false;

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
      id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: ['', Validators.required],

    });
  }
  resetPropertyForm()  {
    this.editProperty = false;
    this.propertyForm.reset();
  }

  onSaveProperty() {
    const id = this.propertyForm.get('id').value;
    const title = this.propertyForm.get('title').value;
    const category = this.propertyForm.get('category').value;
    const surface = this.propertyForm.get('surface').value;
    const rooms = this.propertyForm.get('rooms').value;
    const description = this.propertyForm.get('description').value;
    console.log(this.propertyForm.value);
    const newProperty = new Property(title, category, surface, rooms, description);

    if (this.editProperty == true) {
      this.propertiesService.updateProperty(newProperty, id);
    } else {
      this.propertiesService.createProperty(newProperty);
    }
    $('#propertiesFormModal').modal('hide');
    this.resetPropertyForm();
  }
  onEditProperty(property: Property, id: number) {
    $('#propertiesFormModal').modal('show');
    this.propertyForm.get('id').setValue(id);
    this.propertyForm.get('title').setValue(property.title);
    this.propertyForm.get('category').setValue(property.category);
    this.propertyForm.get('surface').setValue(property.surface);
    this.propertyForm.get('category').setValue(property.category);
    this.propertyForm.get('rooms').setValue(property.rooms);
    this.propertyForm.get('description').setValue(property.description);
    this.editProperty = true ;
  }
  onDeleteProperty(property: Property) {
    this.propertiesService.removeProperty(property);
  }
  ngOnDestroy(): void {
    this.propertiesSubscription.unsubscribe();
  }
}
