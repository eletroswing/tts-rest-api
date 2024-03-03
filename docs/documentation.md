# Formato padrao:
Todas as respostas seguem o seguinte formato:
```json
{
    "status": "status da resposta",
	"statusCode": "o codigo da resposta",
	"success": "Booleano indicando se a resposta foi sucess ou teve erro",
}

Quando sucess = true, entao, se recebera um campo data com objeto da resposta.
Quando sucess = false, entao, se recebera um campo message com a mensagem de erro.

```

# Temos dois endpoints principais

## POST http://localhost:3000/tts
Recebe um body json, com os seguintes parametros:
- text: Uma string obrigatoria de tamanho minimo 1 e maximo 200.
- voices: Uma string opcional com a voz que deseja tocar(veja /voices). Default Lula.
- headers: Um objeto opcional de modelo {string: any}. Sao os headers para seu webhook.
- metadata: Um capo any opcional que serao enviados no body.data ao seu webhook.

## GET http://localhost:3000/voices
Recebe uma lista de vozes disponiveis.

# O retorno do webhook fica assim
```json
{
	"data": "seus metadados enviados ou null",
	"audio": "audio em base 64, por fins de teste, retorna uma string audio"
}
```