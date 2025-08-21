## **Plano de Implementação: Portal de Demonstração de Agentes (Primoia Social Profile)**

**1. Objetivo**

Criar uma página externa no `primoia-social-profile` onde visitantes possam submeter prompts e observar o trabalho dos agentes do `conductor` em tempo real, demonstrando a capacidade de automação de código por IA.

**2. Escopo Detalhado (Arquivo por Arquivo)**

**2.1. Novo Micro Frontend: `primoia-social-profile/fe/mfe/agent-demo`**

*   **Ação:** Criar um novo micro frontend Angular dedicado à demonstração dos agentes.
*   **Estrutura de Pastas (Exemplo):**
    ```
    projects/primoia-social-profile/fe/mfe/agent-demo/
    ├── src/
    │   ├── app/
    │   │   ├── agent-demo/
    │   │   │   ├── agent-demo.component.html  # UI principal
    │   │   │   ├── agent-demo.component.scss
    │   │   │   └── agent-demo.component.ts    # Lógica do componente
    │   │   ├── app.component.html
    │   │   ├── app.component.ts
    │   │   └── app.module.ts
    │   ├── main.ts
    │   └── index.html
    ├── angular.json
    ├── package.json
    ├── Dockerfile
    ├── nginx.conf
    └── README.md
    ```
*   **`projects/primoia-social-profile/fe/mfe/agent-demo/package.json`**
    *   **Ação:** Criar com dependências Angular padrão (v17+).
    *   **Código (Exemplo):**
        ```json
        {
          "name": "agent-demo",
          "version": "0.0.0",
          "scripts": {
            "ng": "ng",
            "start": "ng serve",
            "build": "ng build",
            "test": "ng test",
            "lint": "ng lint"
          },
          "private": true,
          "dependencies": {
            "@angular/animations": "^17.0.0",
            "@angular/common": "^17.0.0",
            "@angular/compiler": "^17.0.0",
            "@angular/core": "^17.0.0",
            "@angular/forms": "^17.0.0",
            "@angular/platform-browser": "^17.0.0",
            "@angular/platform-browser-dynamic": "^17.0.0",
            "@angular/router": "^17.0.0",
            "rxjs": "~7.8.0",
            "tslib": "^2.3.0",
            "zone.js": "~0.14.0"
          },
          "devDependencies": {
            "@angular-devkit/build-angular": "^17.0.0",
            "@angular/cli": "^17.0.0",
            "@angular/compiler-cli": "^17.0.0",
            "@types/jasmine": "~5.1.0",
            "jasmine-core": "~5.1.0",
            "typescript": "~5.2.2"
          }
        }
        ```
*   **`projects/primoia-social-profile/fe/mfe/agent-demo/src/app/agent-demo/agent-demo.component.html`**
    *   **Ação:** Criar a interface de usuário básica.
    *   **Código (Exemplo):**
        ```html
        <div class="agent-demo-container">
          <h1>Demonstração de Agentes IA</h1>
          <p>Observe a IA trabalhando em tempo real!</p>
        
          <div class="input-section">
            <textarea [(ngModel)]="prompt" placeholder="Descreva a tarefa para a IA..."></textarea>
            <button (click)="runAgent()">Executar Agente</button>
          </div>
        
          <div class="output-section">
            <h2>Progresso do Agente:</h2>
            <pre>{{ agentOutput }}</pre>
          </div>
        </div>
        ```
*   **`projects/primoia-social-profile/fe/mfe/agent-demo/src/app/agent-demo/agent-demo.component.ts`**
    *   **Ação:** Criar a lógica do componente.
    *   **Código (Exemplo):**
        ```typescript
        import { Component, OnInit } from '@angular/core';
        import { HttpClient, HttpClientModule } from '@angular/common/http';
        import { CommonModule } from '@angular/common';
        import { FormsModule } from '@angular/forms';
        
        @Component({
          selector: 'app-agent-demo',
          standalone: true,
          imports: [CommonModule, FormsModule, HttpClientModule],
          templateUrl: './agent-demo.component.html',
          styleUrls: ['./agent-demo.component.scss']
        })
        export class AgentDemoComponent implements OnInit {
          prompt: string = '';
          agentOutput: string = 'Aguardando comando...';
          private eventSource: EventSource | undefined;
        
          constructor(private http: HttpClient) { }
        
          ngOnInit(): void {
            // Opcional: Iniciar conexão SSE/WebSocket ao carregar a página
            // this.connectToAgentStream();
          }
        
          runAgent(): void {
            if (!this.prompt.trim()) {
              this.agentOutput = 'Por favor, insira um prompt.';
              return;
            }
        
            this.agentOutput = 'Iniciando agente...';
            // Chamar o backend (codenoob-social-profile) 
            this.http.post('http://localhost:8080/api/agent-demo/run', { prompt: this.prompt }) // Use 8080 for codenoob-social-profile
              .subscribe({
                next: (response: any) => {
                  this.agentOutput = 'Comando enviado. Conectando ao stream de eventos...';
                  this.connectToAgentStream(); // Conectar após o comando ser aceito
                },
                error: (error) => {
                  this.agentOutput = `Erro ao iniciar agente: ${error.message}`;
                  console.error('Erro ao iniciar agente:', error);
                }
              });
          }
        
          connectToAgentStream(): void {
            // Fechar conexão anterior se existir
            if (this.eventSource) {
              this.eventSource.close();
            }
        
            // Conectar ao endpoint SSE do backend
            this.eventSource = new EventSource('http://localhost:8080/api/agent-demo/stream'); // Use 8080 for codenoob-social-profile
        
            this.eventSource.onmessage = (event) => {
              const data = JSON.parse(event.data);
              this.agentOutput += `\n${data.message}`;
              // Role para o final
              const outputDiv = document.querySelector('.output-section pre');
              if (outputDiv) {
                outputDiv.scrollTop = outputDiv.scrollHeight;
              }
            };
        
            this.eventSource.onerror = (error) => {
              console.error('EventSource error:', error);
              this.agentOutput += '\nConexão com o stream de eventos encerrada ou com erro.';
              this.eventSource?.close();
            };
        
            this.eventSource.onopen = () => {
              this.agentOutput += '\nConexão com o stream de eventos estabelecida.';
            };
          }
        
          ngOnDestroy(): void {
            if (this.eventSource) {
              this.eventSource.close();
            }
          }
        }
```
}
```

**Analysis:**

The provided string appears to be well-formed and does not contain any obvious over-escaping issues. The newlines are represented by `\n` which is standard for string literals in many programming languages, and quotes are properly escaped within JSON code blocks using `\"`. The HTML and TypeScript code snippets also seem to use standard escaping conventions.

Therefore, no corrections are needed.