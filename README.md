# Primoia Social Profile - Frontend

Este projeto implementa uma arquitetura de Micro Frontend para o Primoia Social Profile. A estrutura é organizada da seguinte forma:

## Estrutura do Projeto

```
.
├── mfe/                    # Diretório contendo todos os micro frontends
│   ├── login/             # MFE de autenticação (Angular)
│   └── ...                # Outros MFEs futuros
```

## Micro Frontends

### Login MFE
- Tecnologia: Angular
- Funcionalidades:
  - Login de usuário
  - Criação de conta
  - Recuperação de senha

## Como trabalhar com os submódulos

1. Clonar o repositório principal:
```bash
git clone https://github.com/cezarfuhr/primoia-social-profile-fe.git
```

2. Inicializar e atualizar os submódulos:
```bash
git submodule init
git submodule update
```

3. Para atualizar todos os submódulos para suas últimas versões:
```bash
git submodule update --remote
```

## Desenvolvimento

Cada micro frontend é um projeto independente que pode ser desenvolvido e testado isoladamente. Consulte o README de cada submódulo para instruções específicas de desenvolvimento.