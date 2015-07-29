/** REST is a term coined by Roy Fielding which specifys constraints on how connected components in distributed Hypermedia system should behave **/
// There are two broad kinds of URLs in REST : Ones that point to a collection (group) and ones that point to an individual item in collection 

/*
RESTful API HTTP Method Behavior for collection URLs
HTTP method   Behavior
  GET           -Get the summarized details of the members of the collection, including their unique
                identifiers.
  PUT           -Replace the entire collection with a new collection.
  POST          -Add a new item in the collection. It is common to return a unique identifier for the created
                resource.
  DELETE        -Delete the entire collection
  
RESTful API HTTP Method Behavior for item URLs
HTTP method   Behavior
  GET           -Get the details of the item.
  PUT           -Replace the item.
  POST          -Would treat the item as a collection and add a new sub-item in the collection. It is not generally used as you tend to simply replace properties on the item as a whole (in other words, use PUT).
  DELETE        -Delete the item.
*/
