if (process.env.NODE_ENV === "production") {
  throw new Error("Can't run seeds in production");
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("threads")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("threads").insert([
        {
          id: 1,
          boardId: 1,
          subject: "First Thread!",
          author: "Daniel",
          comment: "This is the comment, pretty nice",
          file: "something.jpg"
        },
        {
          id: 2,
          boardId: 2,
          subject: "Second Thread",
          comment: "This is the comment, pretty nice!!",
          file: "something.jpg"
        },
        {
          id: 3,
          boardId: 3,
          comment: "This is the comment, pretty nice!",
          file: "something.png"
        }
      ]);
    });
};
