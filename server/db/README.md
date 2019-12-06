### Commonly used Knex commands

New Migration:

> .\node_modules\.bin\knex --knexfile .\src\knexfile.ts migrate:make <name_here>

To run migration:

> .\node_modules\.bin\knex --knexfile .\src\knexfile.ts migrate:latest

To rollback:

> .\node_modules\.bin\knex --knexfile .\src\knexfile.ts migrate:rollback

To create seeds:

> .\node_modules\.bin\knex --knexfile .\src\knexfile.ts seed:make <name_here>

To run Seeds:
.\node_modules\.bin\knex --knexfile .\src\config\knexfile.ts seed:run

read me more here: https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261
looky here: https://devhints.io/knex
