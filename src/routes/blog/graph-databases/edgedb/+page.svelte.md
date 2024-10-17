# EdgeDB

EdgeDB is not necessarily a graph database, but it uses many graph concepts that make it very appealing for application development. These are some of the features that I like about EdgeDB:

* Use the right tool for the job. EdgeDB was designed to be the primary database for web and native applications. Most graph databases were originally designed as specialty databases where you can load a dataset from your primary database into your graph database for analysis and to gain new insights. The docs for many graph databases either do not have any information about how to use the graph database with a web app or that documentation is buried somewhere and is often lacking information for handling basic CRUD operations. EdgeDB is "commitment[ed] to providing developers with the best possible tools to create and scale applications effortlessly" (https://www.edgedb.com/blog/edgedb-cloud-free-tier-how-we-stack-up-vs-planetscale-supabase-neon).
* The schema and CRUD operations are designed around graph concepts to allow more flexible data modeling and database operations.
* The resulting dataset that is returned from a query is in a hierarchical format and is the same structure as a GraphQL query result. This is perfect for web apps! The datasets that are returned from graph databases often require complex parsing to get to the necessary data. It is obvious that these graph databases were not designed for web apps.
* EdgeDB offers a free tier that you can use to test ideas and build an MVP.
* Solid architecture. EdgeDB is built on top of Postgres, which is battle tested.
* Solid backing and investors, which provides some confidence that EdgeDB will be around for a while.
* EdgeDB branches make it easier to develop and test features by coordinating your code and data for a particular feature.
* After the 1.0 release, they have been able to iterate and add new features much faster than before. (See [The future of EdgeDB (2022) — Yury Selivanov | EdgeDB Day](https://www.youtube.com/watch?v=31k2AoqxWX0))
* EdgeDB is completely open source. Some graph databases are not open source. Maybe that is not a big deal, but that makes me feel a little uneasy because I am used to using open source software and it makes me wonder if they are trying to hide something.
* EdgeDB supports multiple language drivers, has connection pooling built-in, and has documentation for integrating with serverless functions, including Cloudflare Workers. Neo4j is the largest graph database available, so it has some of this stuff. Other graph databases, like TigerGraph, have almost none of this stuff.
* A lot of smart technology people are either backing EdgeDB or they are involved somehow (e.g. consultants).
