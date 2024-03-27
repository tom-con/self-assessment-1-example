/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('accounts', (table) => {
		table.increments('id');
		table.string('name').notNullable();
		table.string('email').notNullable().unique();
		table.string('account_number').notNullable().unique();
		table.decimal('balance').notNullable().defaultTo(0)
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable('accounts')
};
