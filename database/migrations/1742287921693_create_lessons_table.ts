import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'lessons'

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
        .integer('module_id')
        .unsigned()
        .references('id')
        .inTable('modules')
        .notNullable()
        .onDelete('cascade')
      table.integer('status_id').unsigned().references('id').inTable('statuses').notNullable()
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table.string('name', 150).notNullable()
      table.text('notes')
      table.timestamp('publishAt')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
