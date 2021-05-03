const user = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            fname: {
                type: DataTypes.STRING
            },
            lname: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: true,
            freezeTableName: true
        }
    );

    User.sync();
    return User;
}

export default user;