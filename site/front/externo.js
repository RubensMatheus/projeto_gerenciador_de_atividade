$(function() {
    $("#submit").on("click", function () {
        let a = $("#atividade").val()
        let b = $("#descricao").val()
        let c = $('input[type="date"]').val()

        json = JSON.stringify(data);
        console.log(`Botão de envio clicado! ${json}`);

        fetch('http://localhost:3000/dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(function(response) {
            console.log(response)
        })
        .then(data => {
            // $("#tabela").append('<tr> <td> + a + </td> <td> + b + </td> <td> + c + </td> </tr>')
          })
        .catch(error => console.error(error))
        });
});