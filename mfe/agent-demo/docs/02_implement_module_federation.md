# Plano de Implementação: Module Federation para `agent-demo` Microfrontend

## Objetivo
Configurar o microfrontend `agent-demo` para expor seus componentes via Module Federation, permitindo que seja consumido por outros microfrontends ou por uma aplicação shell.

## Passos Detalhados

### 1. Adicionar Dependência de Module Federation
Adicionar `@angular-architects/module-federation` como `devDependencies` no `package.json`.

### 2. Criar `webpack.config.js`
Criar o arquivo `webpack.config.js` na raiz do projeto (`primoia-social-profile/fe/mfe/agent-demo/`) com a seguinte configuração básica para Module Federation:

```javascript
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../../../tsconfig.json'),
  [
    '@angular/core',
    '@angular/common',
    '@angular/router',
    // Adicione outras dependências compartilhadas aqui, se necessário
  ]
);

module.exports = {
  output: {
    uniqueName: 'agentDemo',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.get  (),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'agentDemo',
      filename: 'remoteEntry.js',
      exposes: {
        './Component': './src/app/agent-demo/agent-demo.component.ts', // Expondo o componente principal
      },
      shared: share({
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.get  ().shared,
      }),
    }),
    sharedMappings.get  ().WebpackPluginInstance,
  ],
};
```

### 3. Atualizar `angular.json`
Modificar o `angular.json` para usar o `webpack.config.js` personalizado para as configurações de `build` e `serve`.

Exemplo de modificação (adicionar `customWebpackConfig`):

```json
// ... dentro de "architect" -> "build" -> "options"
"customWebpackConfig": {
  "path": "webpack.config.js"
},
// ... dentro de "architect" -> "serve" -> "options"
"customWebpackConfig": {
  "path": "webpack.config.js"
},
```

### 4. Instalar Dependências
Após as modificações, executar `npm install` no diretório do microfrontend para instalar a nova dependência.

## Verificação
Após a execução, verificar se o microfrontend pode ser construído e servido, e se o `remoteEntry.js` é gerado corretamente.
