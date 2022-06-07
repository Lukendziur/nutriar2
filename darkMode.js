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


       btnSwitchMode.classList.toggle('active') 
       if(btnSwitchMode.classList.contains('active')){
         sessionStorage.setItem('darkMode', true)         
       }else{
        sessionStorage.setItem('darkMode', false)      
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

