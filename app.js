window.addEventListener('DOMContentLoaded', () => {

  try{
    const storage = JSON.parse(localStorage.getItem("shoppingCartStorage"));
    storage ? circle.textContent = storage.length : ''

    const form = document.getElementById('form')
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputArray = [...form.elements]
          getUserData(inputArray)     
        
      })

      
    const buttonCalories = document.getElementById('btnCalories')
    buttonCalories.addEventListener('click', () => {
      const insertCalories = document.getElementById('caloriesPerDay') 
      insertCalories.classList.add('alert')
      insertCalories.classList.add('alert-danger')
      insertCalories.innerHTML = 'Por favor, primero calcule Peso Ideal e IMC'
    })

    const btnIMC = document.getElementById('btnIMC')

    btnIMC.addEventListener('click', () => {
      const insertIMC = document.getElementById('insertIMC')
      insertIMC.classList.add('alert')
      insertIMC.classList.add('alert-danger')
      insertIMC.innerHTML = 'Por favor, primero calcule Peso Ideal'
    })
  }catch(e){
    console.error({title: 'Error in DOMContentLoaded event', details: e});

  }
  
  

});


/**
 * getIMC
 * @param {*} userGender 
 * @param {*} userHeight 
 * @returns number
 */
const getIMC = (userGender, userHeight) => {
  try{
  let weight = document.getElementById('weight').value
    if (weight && userGender && userHeight){

      const insertIMC = document.getElementById('insertIMC')
      insertIMC.classList.add('alert')
      insertIMC.classList.remove('alert-danger')
      insertIMC.classList.add('alert-success')

      userHeight = Math.round(userHeight) / 100;
      weight = Math.round(weight);
      let indice = weight / Math.pow(userHeight, 2);
      let result;

      switch (userGender.toUpperCase()) {
        case "MEN":
          indice < 21 ? (result = "Peso debajo de lo recomendado") : "";
          indice >= 21 && indice < 25 ? (result = "Peso normal") : "";
          indice >= 25 && indice < 30 ? (result = "Sobrepeso") : "";
          indice > 30 ? (result = "Obesidad") : "";
          break;

        case "WOMEN":
          indice < 20 ? (result = "Peso debajo de lo recomendado") : "";
          indice >= 20 && indice < 24 ? (result = "Peso normal") : "";
          indice >= 24 && indice < 29 ? (result = "Sobrepeso") : "";
          indice > 29 ? (result = "Obesidad") : "";
          break;
        default:

          result = 'Lo sentimos, algunos de los datos ingresados no han sido correctos. Refresque la p??gina y vuelva a intentarlo.'

          break;
      }
      insertIMC.innerHTML = `Su IMC es: ${indice.toFixed(2)}. El diagn??stico es: ${result}`

      return weight;
    } else {
      const insertIMC = document.getElementById('insertIMC')
      insertIMC.classList.add('alert')
      insertIMC.classList.add('alert-danger')
      insertIMC.innerHTML = `Para calcular IMC necesitamos que primero calcule su Peso Ideal, luego introduzca su peso y calcule IMC.`

    }  
  }catch(e){
    console.error({title: 'Error in getIMC function', details: e});

  }
 
};

/**
 * getCalories
 * @param {*} weight 
 * @param {*} gender 
 * @param {*} userHeight 
 * @param {*} userAge 
 */
const getCalories = (weight, gender, userHeight, userAge) => {
  try{
  let activityData = document.getElementById('activitySelect').value
    const insertCalories = document.getElementById('caloriesPerDay') 
    insertCalories.classList.add('alert')
    insertCalories.classList.remove('alert-danger')
    insertCalories.classList.add('alert-success')

      const activityInfoArray = [
      { activityType: "sedentarismo", value: 1.2 },
      { activityType: "baja", value: 1.375 },
      { activityType: "moderada", value: 1.55 },
      { activityType: "intensa", value: 1.725 },
      { activityType: "profesional", value: 1.9 },
    ];

      if (weight && gender && userHeight && userAge && activityData) {
    for (let i = 0; i < activityInfoArray.length; i++) {
      if (activityData.toLowerCase() === activityInfoArray[i].activityType) {
        const activityPerWeek = activityInfoArray[i].value;
        let result;
        if (gender.toUpperCase() == "WOMEN") {
          result =
            655 +
            9.6 * weight +
            1.8 * userHeight -
            4.7 * userAge * activityPerWeek;
        } else if (gender.toUpperCase() == "MEN") {
          result =
            66 + 13.7 * weight + 5 * userHeight - 6.8 * userAge * activityPerWeek;
        } else {
  
          insertCalories.innerHTML = `Lo sentimos, hubo alg??n error en el ingreso de los datos. Por favor refresque la p??gina e intentelo nuevamente.`
        }
        insertCalories.innerHTML = `Su consumo de calor??as diario recomendado para mantener su peso es: ${result.toFixed()}`

      }
    }
      } else {
        
        insertCalories.classList.add('alert')
        insertCalories.classList.add('alert-danger')
        insertCalories.innerHTML = 'Por favor, revise los datos ingresados y vuelva a intentarlo'
        insertCalories.innerHTML = `Por favor ingrese los datos: Peso, Edad, Estatura, y nivel de actividad f??sica`
      }

  }catch(e){
    console.error({title: 'Error in getCalories function', details: e});

  }
 
};

/**
 * getIdealweight
 * @param {*} userAge 
 * @param {*} userGender 
 * @param {*} userHeight 
 */
const getIdealweight = (userAge, userGender, userHeight) => {
  try{
    if (userAge && userAge > 0 && userGender && userHeight && userHeight > 70){
        const insertIdealWeight = document.getElementById('insertIdealWeight')
        insertIdealWeight.classList.add('alert')
        insertIdealWeight.classList.remove('alert-danger')
        insertIdealWeight.classList.add('alert-success')

      let result;
      if (userGender.toUpperCase() === "WOMEN") {
        result = 50 + ((userHeight - 150) / 4) * 3 + (userAge - 20) / 4;
        let finalResult = result * 0.9;
        insertIdealWeight.innerHTML = `Su peso ideal seg??n su edad y g??nero es ${finalResult.toFixed()} kgs`
      } else if (userGender.toUpperCase() === "MEN") {
        result = 50 + ((userHeight - 150) / 4) * 3 + (userAge - 20) / 4;
        insertIdealWeight.innerHTML = `Su peso ideal seg??n su edad y g??nero es ${result.toFixed()} kgs`
      } 
      } else{
        const insertIdealWeight = document.getElementById('insertIdealWeight')
        insertIdealWeight.classList.add('alert')
        insertIdealWeight.classList.add('alert-danger')
        insertIdealWeight.innerHTML = 'Por favor, revise los datos ingresados y vuelva a intentarlo'

      }
        
  }catch(e){
    console.error({title: 'Error in getIdealweight function', details: e});

  }
    
};

/**
 * getUserData
 * @param {*} inputArray 
 */
const getUserData = (inputArray) => {  
  try{
    const userData = {};

      inputArray.forEach((input) => {
      
        if(input.type == 'radio'){
          if (input.checked){
            userData.genreSelected = input.id        
          }
          
        } else {
          if(input.id !== 'btnIdealWeight'){
            userData[input.id] = input.value; 
          }
            
        }
      })

      const userAge = userData.age
      const userHeight = userData.height
      const userGender = userData.genreSelected
          
        getIdealweight(userAge, userGender, userHeight)
          

      
        // IMC
        let weightCalories;
        const btnIMC = document.getElementById('btnIMC')    
          const getIMCfunction = (userGender, userHeight) => {      
            weightCalories = getIMC(userGender, userHeight);
        }
        
        btnIMC.addEventListener('click', function(){  
            getIMCfunction(userGender, userHeight)         
            
        })  

      // Calories       
        const btnCalories = document.getElementById('btnCalories')        
      btnCalories.addEventListener('click', function(){
        getCalories(weightCalories, userGender, userHeight, userAge)
        })
    
  }catch(e){
    console.error({title: 'Error in getUserData function', details: e});

  }
  
 
  
   
};




   

   
   
