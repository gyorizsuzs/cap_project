namespace com.training;

using {
    cuid,
    managed,
    sap.common.CodeList,
    Country,
    Currency
} from '@sap/cds/common';

entity Books : cuid, managed {
    // key ID          : UUID;
    title       : localized String(255) @mandatory;
    genre       : Genre                 @assert.range: true;
    publCountry : Country;
    stock       : NoOfBooks default 0;
    price       : Price;
    isHardCover : Boolean;
    author      : Association to Authors  @mandatory  @assert.target;
}

type NoOfBooks : Integer;

type Price {
    amount   : Decimal;
    currency : Currency;
}

type Genre     : Integer enum {
    fiction     = 1;
    non_fiction = 2;
}

entity Authors : cuid, managed {
    // key ID          : UUID;
    name        : String(100)           @mandatory;
    dateOfBirth : Date;
    dateOfDeath : Date;
    epoch       : Association to Epochs @assert.target;
    books       : Association to many Books
                      on books.author = $self;
}

entity Epochs : CodeList {
    key ID : Integer;
}

annotate Books with {
    modifiedAt @odata.etag
};

annotate Authors with {
    modifiedAt @odata.etag
};
