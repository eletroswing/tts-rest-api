# Primeiro
Baixe o repositorio:
```bash 
git clone https://github.com/eletroswing/tts-rest-api
cd tts-rest-api
```

# Segundo
Instale as dependencias:
```bash
npm i
```

# Terceiro
Suba o container docker necessario. Ele subira um rabbit mq com painel de admin em: http://localhost:15672, seu usuario e senhas padrao sao guest
```bash
docker-compose -f ./infra/docker-compose.yml up -d
```

# Quarto
Instale o transpiler
```bash
npm run transpiler
```

# Quinto
Rode o projeto.
Configurei um pm2 para rodar tanto a api com 1 instancias, quanto 2 processadores de fila do rabbit mq, se necessario, edite o ecossystem.config.js
> Para rodar esse comando, voce precisa ter bun instalado e configurado
```bash
npx pm2 start ecossystem.config.js
```

Para ver os logs, de:
```bash
pm2 logs
```

# Sexto
Voce pode rodar os dois sistemas separadamente:

Para o consumer:
```bash
npm run consumer:start
```
ou
```bash
npm run consumer:dev
```


Para a api:
```bash
npm run web:start
```
ou
```bash
npm run web:dev
```