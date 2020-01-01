exports.up = function(knex) {
  return knex.schema.createTable("threads", table => {
    table.increments().primary();
    table
      .integer("boardId")
      .unsigned()
      .references("id")
      .inTable("boards")
      .notNullable()
      .onDelete("cascade");
    table.string("subject").nullable();
    table.string("author").defaultTo("Anonymous");
    table.text("comment", "longtext").notNullable();
    table.string("file").notNullable();
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  if (process.env.NODE_ENV !== "production") {
    return knex.schema.dropTableIfExists("threads");
  }
};
