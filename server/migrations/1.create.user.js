"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            "users",
            {
                no: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                id: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                deleted: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.fn('NOW'),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.fn('NOW'),
                },
            },
            {
                timestamps: true,
                initialAutoIncrement: 0
            }
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("users");
    },
};
