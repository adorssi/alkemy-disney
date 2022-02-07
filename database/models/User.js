module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define('User',
        {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING
                },
                email: {
                    type: DataTypes.STRING
                },
                password: {
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
            tableName: 'users'
        }
    );

        return User;
}