"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface
            .createTable(
                "history",
                {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    input: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    output: {
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
                        defaultValue: Sequelize.fn("NOW"),
                    },
                    updatedAt: {
                        type: Sequelize.DATE,
                        defaultValue: Sequelize.fn("NOW"),
                    },
                },
                {
                    timestamps: true,
                }
            )
            .then(async () => {
                await queryInterface.addColumn("history", "user_no", {
                    type: Sequelize.INTEGER,
                });
                await queryInterface.addConstraint("history", {
                    fields: ["user_no"],
                    type: "foreign key",
                    name: "users_history_no_fk",
                    references: {
                        table: "users",
                        field: "no"
                    },
                    onDelete: "cascade",
                    onUpdate: "cascade",
                });
            });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("history");
    },
};
