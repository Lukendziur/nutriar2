  //Código del dark-mode
  const btnSwitchMode = document.querySelector('#switchMobile');

  const btnMoon = document.getElementById('moonIcon')
  const btnSun = document.getElementById('sunIcon')
  btnMoon.classList.remove('moonIcon')




  if (sessionStorage.getItem('darkMode') == 'true') {
  btnSun.classList.remove('sunIcon')
   document.body.classList.add('dark');
    btnMoon.classList.add('moonIcon')
} else if (sessionStorage.getItem('darkMode') == 'false') {
  document.body.classList.remove('dark');
  btnSun.classList.add('sunIcon')
  btnMoon.classList.remove('moonIcon')
}
   






   btnSwitchMode.addEventListener('click', () => {     

      //  document.body.classList.toggle('dark');
       btnSwitchMode.classList.toggle('active') // Si está activo, estamos en darkMode: se muestra sol
      //  btnMoon.classList.toggle('moonIcon')
      //  btnSun.classList.toggle('sunIcon')

       if(btnSwitchMode.classList.contains('active')){
        //  btnMoon.classList.add('moonIcon')
         sessionStorage.setItem('darkMode', true)         
       }else{
        sessionStorage.setItem('darkMode', false)      
        // btnMoon.classList.remove('moonIcon')


       }

       if (sessionStorage.darkMode) {
          if (sessionStorage.getItem('darkMode') == 'true') {

        document.body.classList.add('dark');
          btnSun.classList.remove('sunIcon')
            btnMoon.classList.add('moonIcon')
        
      } else if(sessionStorage.getItem('darkMode') == 'false') {

        document.body.classList.remove('dark');
        btnSun.classList.add('sunIcon')
        btnMoon.classList.remove('moonIcon')

      }
       }
     

          })

