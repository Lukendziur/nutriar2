# Proyecto Final
## Como parte del proyecto final de coderhouse, se realizará un simulador de peso ideal, IMC y calorías por día. El proyecto ya cuenta con la plantilla HTML solicitada (la misma puede ir variando según las necesidades), como también, ya cuenta con los estilos. Sin embargo, se entrega esta primera parte por separado, con el ingreso de datos a través de prompt(). 

## El presente desafío se compone de 4 funciones:
# getUserData(): 
La función está pensada para obtener el ingreso de los datos principales, pero además, es la estructura principal del script.
Según las secuencias que se vayan dando (a partir del usuario), se ejecutarán las otras funciones.

# getIdealweight():
Es la primera de las funciones, que le ofrece al usuario la posibilidad de consultar su peso ideal. Si esta función se ejecuta, se permite el ingreso de los datos y por ende, las demás funciones pueden nutrirse de estos parámetros. De lo contrario, se emitirá un alert() con un mensaje de despedida.

# getIMC():
Si el usuario responde que desea recibir información sobre su índice de masa corporal, entonces se ejecutará esta función, que además solicita el dato del peso al usuario.

# getCalories():
Por último, se le consultará al usuario si quiere recibir información sobre la cantidad de calorías a consumir para *mantener el peso*.
Es importante entender que esta función está pensada para ser desarrollada con mayor complejidad a lo largo del curso, de cara al proyecto final. Se espera que esta función reciba un parámetro de la función getIMC con el diagnóstico del usuario, y le pueda indicar cuántas calorías comer por día según quiera: bajar de peso, subir de peso o mantenerlo. 


<!-- Correcciones en progreso:
- Que el carrito no acepte más de 10 libros 
- Tema de select de actividad física, modificar ese texto horrendo
 -->