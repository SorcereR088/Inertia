import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('organization_id')
        .unsigned()
        .references('id')
        .inTable('organizations')
        .notNullable()
        .onDelete('cascade')
      table
        .integer('access_level_id')
        .unsigned()
        .references('id')
        .inTable('access_levels')
        .notNullable()
      table
        .integer('difficulty_id')
        .unsigned()
        .references('id')
        .inTable('difficulties')
        .notNullable()
      table.integer('status_id').unsigned().references('id').inTable('statuses').notNullable()
      table.string('name', 50).notNullable()
      table.text('note')
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
