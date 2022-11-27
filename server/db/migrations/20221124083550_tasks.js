/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tasks', table => {
      table.increments('id');
      table.string('title').notNullable();
      table.string('description').nullable();
      table.string('priority').notNullable();
      table.string('status').notNullable();
      table.integer('owner_id').notNullable().unsigned();
      table.foreign('owner_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('responsible_id').notNullable().unsigned();
      table.foreign('responsible_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.date('created_at').nullable();
      table.date('updated_at').nullable();
      table.date('end_at').nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
