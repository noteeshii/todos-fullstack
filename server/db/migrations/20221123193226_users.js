/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments('id');
      table.string('first_name').notNullable();
      table.string('second_name').notNullable();
      table.string('third_name').notNullable();
      table.string('login').notNullable().unique();
      table.string('password').notNullable();
      table.integer('chief_id').nullable().unsigned();
      table.foreign('chief_id').references('users.id').onDelete('SET NULL').onUpdate('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
