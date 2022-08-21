"use strict";
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable("users", {
            no: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncreament: true,
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false,
            },
        });
    },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable("users");
    },
};