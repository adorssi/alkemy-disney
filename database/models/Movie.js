module.exports = (sequelize, DataTypes) => {
    
    const Movie = sequelize.define('Movie',
        {
            id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                titulo: {
                    type: DataTypes.STRING
                },
                imagen: {
                    type: DataTypes.STRING
                },
                fecha_creacion: {
                    type: DataTypes.DATE
                },
                calificacion: {
                    type: DataTypes.INTEGER
                },
                genre_id: {
                    type: DataTypes.INTEGER
                },
                createdAt: {
                    type: DataTypes.DATE
                },
                updatedAt: {
                    type: DataTypes.DATE
                }
        },
        {
            tableName: 'movies'
        }
    );

    Movie.associate = function(models) {
        Movie.belongsToMany(models.Character, {
            as: 'characters',
            through: 'character_movie',
            foreignKey: 'movie_id',
            otherKey: 'character_id'
        });

        Movie.belongsTo(models.Genre, {
            as: 'genres',
            foreignKey: 'genre_id'
        });
    }

        return Movie;
}