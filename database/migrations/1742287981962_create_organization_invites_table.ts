import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organization_invites'

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
        .integer('invited_by_user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('cascade')
        .notNullable()
      table
        .integer('canceled_by_user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.string('email', 254).notNullable()
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('cascade')
        .notNullable()
      table.timestamp('accepted_at')
      table.timestamp('canceled_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
