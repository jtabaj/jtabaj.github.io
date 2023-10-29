let ventasForm = document.getElementById("ventasForm");

ventasForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var categoria = document.getElementById("categoria").value; // descuento
  var cantidad = document.getElementById("cantidad").value;

  var mail = document.getElementById("mail");

  // Validación del email con expresiones regulares
  // https://www.coderbox.net/blog/validar-email-usando-javascript-y-expresiones-regulares/
  var totalPagar = document.querySelector("#totalPagar");
  var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  var valor_unitario = 200;
  var descuento = 0;
  var total = 0;

  if (cantidad == "" || cantidad == "0") {
    alert("Debe ingresar cantidad");
  }
  if (!validEmail.test(mail.value)) {
    alert("El mail no es válido");
  } else {
    console.log("cantidad: " + cantidad);
    console.log("categoria: " + categoria);
    total = Math.round(cantidad * (categoria / 100) * valor_unitario);
    console.log("total: " + total);

    totalPagar.textContent = "Total a Pagar: $ " + total;
  }
});

ventasForm.addEventListener("reset", (e) => {
      totalPagar.textContent = "Total a Pagar: $ ";
  });