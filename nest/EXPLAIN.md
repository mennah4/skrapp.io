# Answers

## Describe NestJS's main concepts and its advantages over plain Node.js
NestJS is a powerful framework built on top of Node.js for server-side applications and can be used with any Node.js technology. It also provides the opportunity to use Express and Fastify in the application.

The main concepts of NestJS are: 
* **Modular approach:** This is the most popular concept of NestJS, which simplifies the design of any project by splitting each functionality into a smaller module. Each module can be reusable and applies a specific functionality. For example, modules in a demo app created to perform CRUD operations on todos will include the todos module itself to handle the endpoints for the operations, todos data, and anything specific to it. Users module will perform operations on the users like defining the data type. The Auth module will handle all the auth endpoints like user login and manage the protected routes.

* **Dependency injection:** After defining the dependencies (like database connections as we have here with supabase using TypeORM), NestJS takes care of the injection to the components.

* **Routing and middlewares:** The structured routing system by NestJS uses controllers to expose endpoints, and middlewares allow us to handle connections.

* **Decorators:** The extensive use of decorators simplifies the configuration and setup of various aspects of the application, such as routing, middleware, and service providers.

Advantages of NestJS over plain Node.js: With all the features provided by NestJS, as well as the ability to use TypeScript, make it a compelling choice over plain Node.js.

## Explain TypeORM's role in managing database connections and operations
TypeORM, as any Object-Relational Mapping (ORM) library, provides an easy way of connecting with the database. Instead of writing SQL queries, we can define entities provided by TypeORM. Once we inject the entity repository, we can perform all CRUD operations or any operation on the data. For example, in this app, todos repository.

## Demonstrate a complex use-case with TypeORM
* **Handling transactions:** In our todos example, a possible way of using transactions is depending on the `@Transaction()`. We can put in a transaction that first marks the todo as done and then updates the completion time.
* **Use of join:** If we have a todo status and we want to query the completed todos for the user.
