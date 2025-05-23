# Primoia Social Profile Frontend

Este é o projeto principal que integra os micro frontends do sistema Primoia Social Profile.

## Estrutura do Projeto

O projeto é organizado em micro frontends utilizando submódulos Git:

- `mfe/login`: Micro frontend responsável pela autenticação (porta 4200)
- `mfe/home`: Micro frontend responsável pela área principal (porta 4201)

## Requisitos

- Node.js 20.x
- npm 10.x
- Docker (opcional)
- Git com suporte a submódulos

## Clonando o Projeto

```bash
# Clone com submódulos
git clone --recursive https://github.com/seu-usuario/primoia-social-profile-fe.git

# Ou, se já clonou sem submódulos
git submodule update --init --recursive
```

## Desenvolvimento Local

Cada micro frontend pode ser executado independentemente:

### Login MFE (porta 4200)
```bash
cd mfe/login
npm install
npm start
```

### Home MFE (porta 4201)
```bash
cd mfe/home
npm install
npm start
```

## Executando com Docker

Cada micro frontend possui sua própria configuração Docker:

### Login MFE
```bash
cd mfe/login
docker build -t mfe-login .
docker run -d -p 4200:4200 mfe-login
```

### Home MFE
```bash
cd mfe/home
docker build -t mfe-home .
docker run -d -p 4201:4201 mfe-home
```

## Arquitetura

O projeto utiliza a seguinte arquitetura:

- Module Federation para compartilhamento de código entre micro frontends
- Angular 19 como framework base
- NGINX como servidor web para produção
- Configuração CORS para comunicação entre módulos

## Desenvolvimento

### Atualizando Submódulos

Para atualizar os submódulos para as últimas versões:

```bash
git submodule update --remote
git add .
git commit -m "chore: atualiza submódulos"
git push
```

### Criando Novos Recursos

1. Escolha o micro frontend apropriado
2. Desenvolva o recurso no submódulo
3. Commit e push no submódulo
4. Atualize a referência no projeto principal

## Configuração de Produção

Para ambiente de produção, considere:

1. Ajustar configurações CORS no nginx.conf
2. Configurar variáveis de ambiente
3. Implementar SSL/TLS
4. Configurar CDN se necessário

## Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença [sua licença aqui].