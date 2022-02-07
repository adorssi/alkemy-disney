module.exports = (sequelize, DataTypes) => {
    
    const CharacterMovie = sequelize.define('CharacterMovie',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            movie_id: {
                    type: DataTypes.INTEGER,
                },
            character_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'character_movie'
        }
    );

    CharacterMovie.associate = function(models) {
        CharacterMovie.belongsTo(models.Movie, {
            foreignKey: 'movie_id',
            as: 'movies'
        })

        CharacterMovie.belongsTo(models.Character, {
            foreignKey: 'character_id',
            as: 'characters'
        })
   }
        return CharacterMovie;
}