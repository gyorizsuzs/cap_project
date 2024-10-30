using com.training as db from '../db/schema';


// Serves Administrators managing data from the application
service AdminService @(path: '/admin') {

    entity Books   as projection on db.Books;
    entity Authors as projection on db.Authors;

}
