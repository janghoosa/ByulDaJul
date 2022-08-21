module.exports = (sequelize, DataTypes) => {
    const history = sequelize.define(
        "history",
        {
            input: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            output: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            tableName: "history",
            timestamps: true,
        }
    );
    history.associate = (models) => {
        history.belongsTo(models.user, {
            foreignKey: "user_no",
        })
    }
    return history;
};