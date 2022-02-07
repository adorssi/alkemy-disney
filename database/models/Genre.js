module.exports = (sequelize, DataTypes) => {
    
    const Genre = sequelize.define('Genre',
        {
            id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                nombre: {
                    type: DataTypes.STRING
                },
                imagen: {
                    type: DataTypes.STRING
                },
                createdAt: {
                    type: DataTypes.DATE
                },
                updatedAt: {
                    type: DataTypes.DATE
                }
        },
        {
            tableName: 'genres'
        }
    );

    Genre.associate = function(models) {
        Genre.hasMany(models.Movie, {
            as: 'movies',
            foreignKey: 'genre_id'
        });
    }
        return Genre;
}