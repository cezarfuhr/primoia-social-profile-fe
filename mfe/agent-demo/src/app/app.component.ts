import { Component } from '@angular/core';
import { AgentDemoComponent } from './agent-demo/agent-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgentDemoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agent-demo';
}