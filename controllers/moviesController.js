const db = require('../database/models');
const {Op} = require('sequelize');


const moviesController = {
    list: async (req, res) => {

        try {
            const Movies = await db.Movie.findAll({
                attributes: ['titulo', 'imagen']     
             });
             res.json({
                meta: {
                    name: 'Movies',
                    total: Movies.length
                },            
                data: Movies
        })
        } catch (error) {
            console.log(error);
        }
        
    },
    detail: async (req, res) => {
        try {
            const id = req.params.id;
            
            const movie = await db.Movie.findByPk(id, {
                include: [
                    {association: 'characters'}
                ]
            });

            if(movie) {
                const characters = movie.characters.map(character => {
                    const characterItem = {
                        id: character.id,
                        nombre: character.nombre,
                        imagen: character.imagen
                    }
                    return characterItem;
                });
    
                res.json({
                    movie: {
                        id: movie.id,
                        titulo: movie.titulo,
                        imagen: movie.imagen,
                        fecha_creacion: movie.fecha_creacion,
                        calificacion: movie.calificacion,
                        idGenero: movie.genre_id
                    },        
                    characters
                });

            } else {
                res.json({
                    error: 'No existe una pelicula con el id espeificado'
                });
            }
            

        } catch (error) {
            console.log(error);
        }
    },
    add: async (req, res) => {
        const {titulo, imagen, fecha_creacion, calificacion, genre_id} = req.body;

        try {
            const movie = await db.Movie.create({
                titulo,
                imagen,
                fecha_creacion,
                calificacion,
                genre_id
             });

            res.json({
            success: 'Se agregó correctamente la pelicula ' + titulo
            });

        } catch (error) {
            console.log(error);
        }
         
    },
    update: async (req, res) => {
        const id = req.params.id;
        const {titulo, imagen, fecha_creacion, calificacion, genre_id} = req.body;

        try {
            const movieToUpdate = await db.Movie.update({
                titulo,
                imagen,
                fecha_creacion,
                calificacion,
                genre_id
            },
            {
                where: {id}
            });

            res.json({
                success: 'Se actualizó correctamente la pelicula ' + titulo
                });

        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;

        try {
            const movieToDelete = await db.Movie.destroy({
                where: {id}
            });
            if(movieToDelete) {
                res.json({
                    success: 'Se eliminó la pelicula con id ' + id
                });
            } else {
                res.json({
                    error: 'No se encontró la pelicula con id ' + id
                });
            }            

        } catch (error) {
            console.log(error);
        }
    },
    search: async (req, res) => {
        const titulo = req.query.titulo || '%';
        const genero = parseInt(req.query.genre);
        const order = req.query.order || 'DESC';

        try {
            const movies = await db.Movie.findAll({
                include: [
                    {association: 'genres'}
                ],
                where: {
                    titulo: {[Op.like]: `%${titulo}%`},
                    genre_id: genero || {[Op.like]: '%'}
                },
                order: [
                    ['fecha_creacion', order]
                ]
            });

            res.json(movies)

        } catch (error) {
            console.log(error);
        }

    },
}

module.exports = moviesController;