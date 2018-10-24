const jwt = require('jsonwebtoken');

// =======================
// verrifica token
//========================

let verificaToken = ( req, res, next ) => {

let token = req.get('token');

jwt.verify( token, process.env.SEED, (err, decoded) =>{

        if ( err) {
            return res.status(401).json({
                ok:false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
})

};

// =======================
// verrifica AdminRol
//========================

let verificaAdmin_Role = (req, res , next) => {
    
    let usuario = req.usuario;

    if (usuario.rol === 'ADMIN_ROLE' ){
        next();
    }else{
        return res.json({
            ok: false,
            err: {
                message : ' El usuario no es administrador'
            }
        });
        next();
    }
    next();

};


module. exports = {
    verificaToken,
    verificaAdmin_Role
}