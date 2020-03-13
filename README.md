# projeto-vue-todo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Tópicos
1. Intro
2. Projeto
3. Vue
    1. Fluxo de dados
    2. Componentes
        1. Componentes no Vue
    3. Necessidade de teste
    4. TDD

4. Teoria de testes
    1. Teste caixa branca e caixa preta
    2. Teste enxuto (Exemplo)
    3. Tabela de teste
        * Sequencia

        x | y | Expected
        --|---|----------
        0 | 0 |   0
        2 | 2 |   4
        7 | 0 |   7
        0 | 9 |   9
        6 | 5 |   11

        ```

            function seq(x, y) {
                const result = x + y
                return result
            }

        ```

        * Seleção

        x  | Expected
        ---|----------
        20 |    30
        -10|   -20
        9  |   -1
        10 |    0
        11 |    21

        ```

            function condicao(x) {
                let result = 0

                if(x > 10) {
                    result = x + 10
                } else {
                    result = x - 10
                }

                return result
            }

        ```

        * Interação

        List                |
        --------------------|
        Empty               |
        1 item              |
        2 items             |
        Padrão x items      |
        Maximo y items      | 
        Maximo y + i items  |

        ```

            function loop(lista) {
                lista.forEach(item => {
                    fazAlgo(item)
                })

                return lista
            }

        ```


5. Vue-test-utils
    1. intro
    2. Pair programing QA
    3. Exemplo de teste
        1. Mostrar exemplo da 11ª task
        2. Exemplo do local storage
        3. Cobertura do teste

### Referencias
* https://testautomationu.applitools.com/unit-testing/
* https://github.com/goldbergyoni/javascript-testing-best-practices/