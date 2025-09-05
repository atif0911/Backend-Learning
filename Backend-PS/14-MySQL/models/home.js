const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(
    houseName,
    pricePerNight,
    location,
    rating,
    photo,
    description,
    id
  ) {
    this.houseName = houseName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) {
      console.log(this.houseName);
      return db.execute(
        `UPDATE homes SET houseName=?, pricePerNight=?, location=?, rating=?, photo=?, description=? WHERE id=?`,
        [
          this.houseName,
          this.pricePerNight,
          this.location,
          this.rating,
          this.photo,
          this.description,
          this.id,
        ]
      );
    } else {
      console.log(this.houseName);
      return db.execute(
        `INSERT INTO homes (houseName, pricePerNight, location, rating, photo, description) VALUES (?,?,?,?,?,?)`,
        [
          this.houseName,
          this.pricePerNight,
          this.location,
          this.rating,
          this.photo,
          this.description,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
  }
};
