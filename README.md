# Blue Moon Cinema
Core functionality: view movies, select showtime by filtered dates, reserve seats, and view reservation history.

## Spring Boot

Spring Boot has been configured to run on port `9000` for this project. 

## Database

You will need to create a database called ***final_capstone*** in pgAdmin.

Once the database is created open a `Query Tool` window for the ***final_capstone*** database so  you can run the **setup.sql** to created and populate the User table and populate it with several users.

The **setup.sql** can be found in in the ***/backend-java-server/database*** folder.

Navigate to the ***/backend-java-server/database*** folder in the *Query Tool* window then open and run the **setup.sql** file you should see in that folder.  There should be no errors.

Several application users have been populated into the **users** table you can use to login to the application:

| Username | Password | Role |
| -------- | -------- | ----|
| user | password | ROLE_USER |
| admin | password | ROLE_ADMIN|
| buddy| password | ROLE_USER|
| frank | password | ROLE_USER|

### Database users

Database users define who can do what in the database.  We have been using the superuser `postgres` for our class work.

The database superuser—meaning `postgres`—must only be used for database administration. It must not be used by applications. As such, two database users are created for the capstone application to use as described here:

| Username | Description |
| -------- | ----------- |
| `owner` | This user is the schema owner. It has full access—meaning granted all privileges—to all database objects within the `capstone` schema and also has privileges to create new schema objects. This user can be used to connect to the database from PGAdmin for administrative purposes. |
| `appuser` | The application uses this user to make connections to the database. This user is granted `SELECT`, `INSERT`, `UPDATE`, and `DELETE` privileges for all database tables and can `SELECT` from all sequences. The application datasource has been configured to connect using this user. |

### Datasource

A Datasource has been configured in `/src/resources/application.properties`. It connects to a database called ***final_capstone*** using the `final_capstone_appuser` database user. If you chose a different database name be sure to change it in the `/src/resources/application.properties` 

```
# datasource connection properties
spring.datasource.url=jdbc:postgresql://localhost:5432/final_capstone
spring.datasource.name=final_capstone
spring.datasource.username=final_capstone_appuser
spring.datasource.password=finalcapstone
```

### JdbcTemplate

We will use Spring Dependency Injection in this application.

An example of how to use Spring Dependency Injection to get an instance of `JdbcTemplate` in your DAOs can be found in the `/src/main/java/com/techelevator/dao/JdbcUserDao.java` code.  

If you declare a field of type `JdbcTemplate` and add it as an argument to the constructor, Spring automatically injects an instance for you:

```java
@Service
public class JdbcUserDao implements UserDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcUserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
}
```

### Authentication Controller

There is a single controller provided in the `controller` package called `AuthenticationController.java`.

This controller contains the `/login` and `/register` routes and works with the React starter as is. 

The authentication controller uses the `JdbcUserDao` to read and write data from the users table.

## Front-end setup
​
The first thing you'll need to do is to download any dependencies by running this command:
​
```
npm install
```
​
Next take a moment to review the `.env` file that's located in the root of the project. You can store environment variables that you want to use throughout your application in this file. When you open it, it'll look like this:
​
```
# Java
REMOTE_API=http://localhost:9000  #changed from 9001
PORT=3001
```
​
*Note:* The Java Spring Boot 2 application server is configured to run on port 9000 instead of 8080.
​
Start the React application with the following command:
​
```
npm start
```

