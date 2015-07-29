// NoSQL (Not only SQL) databases will be discussed here, as they were made to meet problems with SQL databases

// theres four broad categories: document-based (mongodb), key-valued (redis), column-family (cassandra) and graph databases (Neo4J)
// these databases are all designed to be very scalable. Document-based provide most amount of features while maintaining good performance while key-value is simple and provides best performance for simple queries


/** Document Databases **/
/* document databases are based on documents which are self-contained pieces of information for a particular entity
example below is a JSON document

{
  "firstName": "John",
  "lastName": "Smith",
  "isAlive": true,
  "age": 25,
  "height_cm": 167.64,
  "address": {
  "streetAddress": "21 2nd Street",
  "city": "New York",
  "state": "NY",
  }
}

in a relational database, it would be stored in two tables, one for persons and another for addresses while for document-based
it is only one document.

*/

/** Key-value stores **/
/* Key-value is like a barebones document database, however in most key-value, you can only query the key whereas for document, you can query the document contents as well
This means that key-value can optimize for faster key-based lookups */

/** Why would people use NoSQL ?
 * For scalability
 * For ease of development

See the CAP Theorem, where Availability (is data acessible to users?), Consistency (data is recorded only once and not multiple times, confusing the hell out of people), and Partition Tolerance (Can continue to operate despite interruptions)

Theres a process where data is split into self-contained units called shards in a process called sharding which removes limits from CAP theorem
Relational databases make sharding difficult while NoSQL have no such problems.

Also for relational databases, you need an ORM where the data is taken and turned into objects so that it can be interacted by with the code
while for NoSQL you can just use JSON.parse or some other parsing language and use it, making development much easier.

Relational is more favored for data analysis and complex queries.

*/
