'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('PostCategories', { 
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
    
    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('PostCategories');
   
  }
};
