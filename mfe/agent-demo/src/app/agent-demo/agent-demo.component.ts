import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class AgentDemoComponent implements OnInit, OnDestroy {
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
