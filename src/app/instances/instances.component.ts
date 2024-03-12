import { Component } from '@angular/core';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrl: './instances.component.css'
})
export class InstancesComponent {
  instances = ['localhost']
  selectedInstance = ''

  onSelect(instance){
    this.selectedInstance = instance
  }
}
