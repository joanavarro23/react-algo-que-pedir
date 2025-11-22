
//Tipado para los inputs
export type InputsRegistro = {
    nombre: string,
    apellido: string,
    usuario: string,
    password: string,
    confirmarPassword: string,
    calle: string,
    altura: string
}

//Tipado para objeto de errores con Partial de TS que hace ? a todos los atributos idem InputsRegistro
export type ErroresForm = Partial<InputsRegistro>

//Estructura para una regla de validacion. Recibe el campo del form y devuelve un flag y el mensaje de error si el flag es False 
type Regla = {
    campoAchequear: keyof InputsRegistro,
    esValido: (data : InputsRegistro) => boolean,        //Flag para decir si el campo esta ok o no
    mensajeError: string
}


const reglasValidacion: Regla[] = [
    //Reglas para todos los campos requeridos, las mas simples
    { campoAchequear: 'nombre', esValido: (data) => !!data.nombre, mensajeError: 'El nombre es obligatorio'},
    { campoAchequear: 'apellido', esValido: (data) => !!data.apellido, mensajeError: 'El apellido es obligatorio'},
    { campoAchequear: 'usuario', esValido: (data) => !!data.usuario, mensajeError: 'El usuario es obligatorio'},
    { campoAchequear: 'password', esValido: (data) => !!data.password, mensajeError: 'La contraseña es obligatoria'},
    { campoAchequear: 'confirmarPassword', esValido: (data) => !!data.confirmarPassword, mensajeError: 'Debe re-ingresar la contraseña'},
    { campoAchequear: 'calle', esValido: (data) => !!data.calle, mensajeError: 'La calle es obligatoria'},

    //Reglas para casos especificos: altura que no este vacia ni sea algo que no sea un numero
    { 
      campoAchequear: 'altura',
      esValido: (data) => data.altura !== '' && !isNaN(Number(data.altura)) && Number(data.altura) > 0,
      mensajeError: 'Ingresa una altura válida'
    },

    //Reglas para casos especificos: password y confirmarPassword deben matchear
    {
        campoAchequear: 'confirmarPassword',
        esValido: (data) => data.password === data.confirmarPassword,
        mensajeError: 'Las contraseñas no coinciden'

    }
]

export const obtenerErroresRegistro = (data : InputsRegistro) : ErroresForm => {
    const errores: ErroresForm = {}

    reglasValidacion.forEach( (regla) => {
        if(!errores[regla.campoAchequear] && !regla.esValido(data)) {
            errores[regla.campoAchequear] = regla.mensajeError
        }
    } )

    return errores
}
