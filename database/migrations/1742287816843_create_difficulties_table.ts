import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'difficulties'

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
      table.string('name', 50).notNullable()
      table.string('color', 10).notNullable()
      table.integer('order').unsigned().notNullable().defaultTo(0)
      table.boolean('is_default').notNullable().defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
