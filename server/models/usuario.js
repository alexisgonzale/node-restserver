

const mondoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values : ['ADMIN_ROLE', 'USER_ROLE'],
    message : '{VALUE} no es un rol válido'
};

let Schema = mondoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String,
        required: false
    }, // no es obligatoria
    role:{
        type: String,
        default: 'USER_ROLE',
        enum:rolesValidos
    }, // default: 'USER_ROLE'
    estado:{
        type: Boolean,
        default: true
    },//boolean
    google:{
        type: Boolean,
        default: false
    }//boolean
});

usuarioSchema.method.toJSON = function() {
    
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin ( uniqueValidator, { message: ' {PATH} debe de ser único ' })

module.exports = mondoose.model('Usuario',usuarioSchema);