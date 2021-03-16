'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('roles', [
           // ADMINISTRATOR
      {
            roleName: "administrator",
            configSys: true,        // dashboard, approved, categories, policy, aboutUs
            addPost: true,
            delPost: true,
            writePost: true,
            addUser: true,
            delUser: true,
            writeUser: true,
            delComment: true,
      },
           // EDITOR
      {
            roleName: "editor",
            configSys: false,
            addPost: true,
            delPost: false,
            writePost: true,        // of yourself
            addUser: false,
            delUser: false,
            writeUser: true,        // of yourself
            delComment: true,       // yourself of post
      },
           // USER
      {
            roleName: "user",
            configSys: false,
            addPost: false,
            delPost: false,
            writePost: false,
            addUser: false,
            delUser: false,
            writeUser: true,        // of yourself
            delComment: true,       // of yourself
      },
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete{ 'roles', null, {}};
     */
     await queryInterface.bulkDelete('roles', null, {});
  }
};
