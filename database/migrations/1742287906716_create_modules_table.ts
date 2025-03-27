import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'modules'

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
        .integer('course_id')
        .unsigned()
        .references('id')
        .inTable('courses')
        .notNullable()
        .onDelete('cascade')
      table.integer('status_is').unsigned().references('id').inTable('statuses').notNullable()
      table.string('name', 100).notNullable()
      table.text('notes')
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
