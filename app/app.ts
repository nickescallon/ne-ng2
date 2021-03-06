/// <reference path="../typings/tsd.d.ts" />

// angular2 dependencies
import 'reflect-metadata';
import 'angular2/node_modules/zone.js/lib/zone'

// browser ES6 polyfil;s
import 'traceur-runtime';

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

// annotations
@Component({
  selector: 'app'
})
@View({
  template: `
    <input #todotext (keyup)="doneTyping($event)">
    <p>{{todotext.value | json}}</p>
    <button (click)="addTodo(todotext.value)">Add Todo</button>
    <p>Friends:</p>
    <ul>
       <li *ng-for="#todo of todos">
          {{ todo | lowercase }}
       </li>
    </ul>
  `,
  directives: [NgFor]
  //templateUrl: some-template-url
})

// controller
class App {
  // name: string;
  todos: Array<string>;

  constructor() {
    // this.name = 'Nico';
    this.todos = ["AAAAv", "Martín", "Shannon", "Ariana", "Kai"];
  }

  addTodo(todo: string) {
    this.todos.push(todo);
  }

  doneTyping($event) {
    if($event.which === 13) {
      this.addTodo($event.target.value);
      $event.target.value = null;
    }
  }
}

bootstrap(App);
