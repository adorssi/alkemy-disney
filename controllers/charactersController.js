const db = require('../database/models');
const {Op} = require('sequelize');

const charactersController = {
    list: async (req, res) => {

        const nombre = req.query.name || '%';
        const edad = parseInt(req.query.age);
        const peso = Number(req.query.peso);

        if(nombre != '%' || edad || peso) {
            try {
                const character = await db.Character.findAll({
                    include: [
                        {association: 'movies'}
                    ],
                    where: {
                        nombre: {[Op.like]: `%${nombre}%`},
                        edad: edad || {[Op.gte]:0},
                        peso: peso || {[Op.gte]:0},
                    }
                });
    
                res.json(character)
    
            } catch (error) {
                console.log(error);
            }
        } else {
            try {  
                const data = await db.Character.findAll({
                    attributes: ['nombre', 'imagen']
                });
                res.json({
                    meta: {
                        name: 'Characters',
                        total: data.length
                    },            
                    data: data
            })
            } catch (error) {
                console.log(error);
            }
        }
        
    },
    detail: async (req, res) => {
        try {
            const id = req.params.id;
            
            const result = await db.Character.findByPk(id, {
                include: [
                    {association: 'movies'}
                ]
            });

            const movies = result.movies.map(movie => {
                const movieItem = {
                    id: movie.id,
                    titulo: movie.titulo,
                    imagen: movie.imagen,
                    calificacion: movie.calificacion,
                    generoId: movie.genre_id
                }
                return movieItem;
            });

            res.json({
                character: {
                    id: result.id,
                    nombre: result.nombre,
                    imagen: result.imagen,
                    edad: result.edad,
                    historia: result.historia,
                },
                movies
            });

        } catch (error) {
            console.log(error);
        }
    },
    add: async (req, res) => {
        const {nombre, imagen, edad, historia} = req.body;
        try {
            const characterToAdd = await db.Character.create({
                nombre,
                imagen,
                edad,
                historia
            });

            res.json({
                savedUser: {
                    nombre,
                    imagen,
                    edad,
                    historia
                }
            });

        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        const id = req.params.id
        const {nombre, imagen, edad, historia} = req.body;
        try {
            const characterToEdit = await db.Character.update({
                nombre,
                imagen,
                edad,
                historia
            },
            {
            where: {id: id}
            });

            res.json({
                userUpdated: {
                    nombre,
                    imagen,
                    edad,
                    historia
                }
            });

        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const characterToDelete = await db.Character.destroy({
                where: {id}
            });
            res.json({
                success: 'Se eliminó el usuario con id ' + id
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = charactersController;