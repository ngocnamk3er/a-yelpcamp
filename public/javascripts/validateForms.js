const forms=document.querySelectorAll(".needs-validation")
      forms.forEach(function(form){
        form.addEventListener('submit',(event)=>{
          if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          }
          form.classList.add('was-validated');
        },false)
      })