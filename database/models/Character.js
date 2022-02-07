module.exports = (sequelize, DataTypes) => {
    
    const Character = sequelize.define('Character',
        {
            id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nombre: {
                    type: DataTypes.STRING
                },
                imagen: {
                    type: DataTypes.STRING
                },
                edad: {
                    type: DataTypes.INTEGER
                },
                peso: {
                    type: DataTypes.DECIMAL
                },
                historia: {
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
            tableName: 'characters'
        }
    );
    Character.associate = function(models) {
        Character.belongsToMany(models.Movie, {
            as: 'movies',
            through: 'character_movie',
            foreignKey: 'character_id',
            otherKey: 'movie_id'
        });
    }
        return Character;
}