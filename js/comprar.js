async function comprar(paquete) {
  let vals;
  let page = 1;
  const {value: formValues} = await swal.mixin({
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2'],
    preConfirm:()=>{
      if(page===1){
        page++;
      }else if(page === 2){
        vals = [document.getElementById('swal-input1.2').value,
        document.getElementById('swal-input2.2').value,
        document.getElementById('swal-input3.2').value]
        page++;
      }
    }
  }).queue([
    {
      title: 'Nuestros Productos',
      html: 
      '<p>Antes de realizar la compra, por favor revísa nuestro catálogo de productos.</p>'+
      '<a href="https://drive.google.com/open?id=1qIkBJpzprvb6mkpNmU8gZT8aULsQkKLI" target="_blank">Ver Catalogo</a>'
    },{
      title: 'Compra',
      html:
      'Nombre: <input id="swal-input1.2" placeholder="Walther" class="swal2-input">' +
      'Correo: <input id="swal-input2.2" placeholder="walther@hondutronics.com" class="swal2-input">' +
      'Numero de Celular: <input id="swal-input3.2" placeholder="99668899" class="swal2-input">'
    }
  ]).then(()=>{
    console.log(vals)
    const payload = {
      nombre: vals[0],
      numero: vals[1],
      correo: vals[2],
      producto: `Compra paquete #${paquete}`
    }

    axios.post('https://hondutronicsbackend.herokuapp.com/registrar', payload)
      .then(function (response) {
        swal(
          'Registrado!',
          'Muchas gracias por registrarse, le contactaremos lo mas pronto posible.',
          'success'
        )
      })
  })
}