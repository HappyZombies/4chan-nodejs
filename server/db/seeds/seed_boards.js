if (process.env.NODE_ENV === "production") {
  throw new Error("Can't run seeds in production");
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex("boards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("boards").insert([
        { id: 1, name: "Politically Incorrect", slug: "pol" },
        { id: 2, name: "Video Games", slug: "v" },
        {
          id: 3,
          name: "Random",
          slug: "b",
          description:
            "The stories and information posted here are artistic works of fiction and falsehood. Only a fool would take anything posted here as fact."
        }
      ]);
    });
};
