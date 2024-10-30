namespace com.training;

entity Authors {
    key ID          : UUID;
        name        : String(100);
        dateOfBirth : Date;
        dateOfDeath : Date;
        books       : Association to many Books
                          on books.author = $self;
}

entity Books {
    key ID          : UUID;
        title       : String(255);
        genre       : Genre;
        publCountry : String(3);
        stock       : NoOfBooks;
        price       : Price;
        isHardCover : Boolean;
        author      : Association to Authors;
}

type NoOfBooks : Integer;

type Price {
    amount   : Decimal;
    currency : String(3);
}

type Genre     : Integer enum {
    fiction     = 1;
    non_fiction = 2;
}
