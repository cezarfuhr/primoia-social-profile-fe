# 🤖 Agent Demo - Portal de Demonstração de Agentes IA

**Micro Frontend Angular para demonstração pública dos agentes de IA do Primoia**

## 📖 Sobre

Este é um portal onde visitantes podem submeter prompts e observar o trabalho dos agentes do `conductor` em tempo real, demonstrando a capacidade de automação de código por IA.

## 🏗️ Arquitetura

```
Frontend (Angular) ↔️ Backend (Spring Boot) ↔️ Conductor Gateway ↔️ Conductor Agents
```

### Componentes:
- **Frontend**: Interface React/Angular para submissão de prompts
- **Backend**: API Spring Boot para processar requisições 
- **Conductor Gateway**: Bridge para invocar agentes
- **Real-time Stream**: Server-Sent Events para feedback em tempo real

## 🚀 Como executar

### Desenvolvimento local
```bash
npm install
npm start
# Acesse http://localhost:4200
```

### Produção (Docker)
```bash
docker build -t agent-demo .
docker run -p 80:80 agent-demo
# Acesse http://localhost
```

## 📁 Estrutura do projeto

```
agent-demo/
├── src/
│   ├── app/
│   │   ├── agent-demo/              # Componente principal
│   │   │   ├── agent-demo.component.html
│   │   │   ├── agent-demo.component.scss  
│   │   │   └── agent-demo.component.ts
│   │   ├── app.component.ts         # App root component
│   │   └── app.component.html
│   ├── index.html                   # Entry point
│   ├── main.ts                      # Bootstrap
│   └── styles.scss                  # Global styles
├── angular.json                     # Angular configuration
├── package.json                     # Dependencies
├── Dockerfile                       # Container setup
├── nginx.conf                       # Reverse proxy config
└── README.md                        # This file
```

## 🛠️ Funcionalidades

### ✅ Implementadas:
- **Interface de prompt**: Textarea para entrada de comandos
- **Execução de agentes**: Botão para iniciar processamento
- **Stream em tempo real**: Server-Sent Events para feedback
- **Display de progresso**: Output em tempo real do agente
- **Tratamento de erros**: Mensagens de erro amigáveis

### 🚧 Próximas funcionalidades:
- [ ] Histórico de execuções
- [ ] Templates de prompts predefinidos
- [ ] Métricas de performance dos agentes
- [ ] Compartilhamento de resultados
- [ ] Autenticação opcional

## 🔗 Integração

### Backend API Endpoints:
- `POST /api/agent-demo/run` - Submete prompt para processamento
- `GET /api/agent-demo/stream` - Stream de eventos em tempo real

### Configuração do Backend:
O backend deve estar configurado para:
1. Receber prompts via POST
2. Invocar o conductor_gateway
3. Streamar progresso via Server-Sent Events
4. Retornar resultados estruturados

## 🎯 Exemplo de uso

1. **Usuário** acessa o portal
2. **Usuário** insere prompt: "Criar uma API REST para gerenciar usuários"
3. **Frontend** envia requisição para backend
4. **Backend** invoca conductor_gateway
5. **Conductor** executa agentes apropriados
6. **Stream** mostra progresso em tempo real:
   ```
   Iniciando agente...
   Analisando requisitos...
   Criando estrutura do projeto...
   Implementando endpoints...
   Executando testes...
   ✅ Código gerado com sucesso!
   ```

## 🛡️ Segurança

- **Rate limiting**: Backend deve implementar controle de taxa
- **Validação**: Sanitização de prompts de entrada
- **Timeouts**: Limite de tempo para execução
- **CORS**: Configurado para domínios autorizados

## 📱 Responsividade

- ✅ Mobile-first design
- ✅ Layouts adaptativos
- ✅ Touch-friendly controls
- ✅ Acessibilidade (WCAG)

## 🔧 Configuração

### Variáveis de ambiente:
```
BACKEND_URL=http://localhost:8080  # URL do backend Spring Boot
API_TIMEOUT=30000                  # Timeout para requisições
STREAM_RECONNECT=true              # Auto-reconexão SSE
```

### Nginx Proxy:
```nginx
location /api/ {
    proxy_pass http://codenoob-social-profile:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## 🚨 Troubleshooting

### Frontend não conecta ao backend
- Verificar CORS configuration
- Confirmar URLs nos componentes
- Checar network requests no DevTools

### Stream de eventos não funciona
- Verificar se backend implementa SSE
- Confirmar endpoint `/api/agent-demo/stream`
- Testar conexão direta: `curl -N http://localhost:8080/api/agent-demo/stream`

### Build falha
- Verificar versões do Node.js (20+) e Angular (17+)
- Executar `npm ci` para clean install
- Checar logs do build para erros específicos

## 🤝 Contribuição

1. Fork o projeto
2. Crie feature branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para branch (`git push origin feature/nova-funcionalidade`)
5. Abra Pull Request

---

**Tecnologias**: Angular 17, TypeScript, SCSS, Docker, Nginx  
**Mantido por**: Equipe Primoia  
**Versão**: 1.0.0  
**Última atualização**: 2025-08-21