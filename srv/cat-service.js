const cds = require("@sap/cds");

class CatalogService extends cds.ApplicationService {
  init() {
    const { Books } = this.entities;

    this.after("READ", Books, this.grantDiscount);
    this.on("submitOrder", this.reduceStock);

    return super.init();
  }

  grantDiscount(results) {
    for (let b of results) {
      if (b.stock > 200) {
        b.title += " -- 11% Discount!";
      }
    }
  }

  async reduceStock(req) {
    const { Books } = this.entities;
    const { book, quantity } = req.data;

    if (quantity < 1) {
      // return req.error("The quantity must be at least 1.");
      return req.error("INVALID_QUANTITY");
    }

    // let query1 = SELECT.one
    //   .from(Books)
    //   .where({ ID: book })
    //   .columns((b) => {
    //     b.stock;
    //   });
    // let query2 = UPDATE(Books)
    //   .where({ ID: book })
    //   .with({ stock: { "-=": quantity } });

    //  OR with template literal

    // let query1 = SELECT.one.from(Books).where`ID=${book}`.columns`stock`;
    // let query2 = UPDATE(Books).where`ID=${book}`
    //   .with`stock = stock - ${quantity}`;

    // let b = await cds.db.run(query1);

    // OR constructed query:

    const stock = await SELECT.one.from(Books).where`ID=${book}`.columns`stock`;

    if (!stock) {
      // return req.error(`Book with ID ${book} does not exist.`);
      return req.error("BOOK_NOT_FOUND", [book]);
    }

    if (quantity > stock) {
      // return req.error(
      //   `${quantity} exceeds stock ${stock} for book with ID ${book}`
      // );
      return req.error("ORDER_EXCEEDS_STOCK", [quantity, stock, book]);
    }

    await UPDATE(Books).where`ID=${book}`.with`stock = stock - ${quantity}`;
    return { stock: stock - quantity };
  }
}

module.exports = CatalogService;
