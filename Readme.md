All active-record entities must extend the --BaseEntity-- class, which provides methods to work with the entity.
Using --EntityManager-- you can manage (insert, update, delete, load, etc.) any entity. --EntityManager-- is just like a collection of all entity repositories in a single place.

--Repository-- is just like (EntityManager) but its operations are limited to a concrete entity

 --type => Photo-- is a function that returns the class of the entity with which we want to make our relationship.

 -- @JoinColumn-- decorator, which indicates that this side of the relationship will own the relationship. Ownerside will contain a column with a foreign key
 