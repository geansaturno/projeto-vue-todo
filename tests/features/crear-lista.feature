Funcionalidade: Criar lista de tarefas do dia 
    Eu como usuário gostaria de criar uma lista com as tarefas que eu preciso fazer no dia
​
    # Regras: 
    #   Será permitido inserir no máximo 10 itens na lista
​
Contexto: Acessar página da lista 
    Dado que estou na página da lista de tarefas
​
Cenário: Criar lista do dia
    Quando eu inserir "Ir no supermercado"
    Então a tarefa deve aparecer na lista
​
Cenário: Selecionar itens que já foram concluídos
    Dado que exista uma tarefa na lista
    Quando eu selecionar uma tarefa que já concluído 
    Então devo ser informado que ela está realizada 
    E a tarefa deve continuar na lista
​
Cenário: Deletar itens
    Dado que exista uma tarefa concluída na lista
    Quando deletar a tarefa que já foram concluída
    Então a tarefa não deve aparecer na lista
​
Cenário: Deletar item da lista
    Dado que exista uma tarefa na lista
    Quando eu deletar esse item
    Então a tarefa não deve aparecer na lista
​
Cenário: Deletar todos os itens da lista
    Dado que eu tenha vários itens na lista 
    Quando eu apagar todos os itens 
    Então a lista deve ficar vazia