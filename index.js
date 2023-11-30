const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://suriya_p:GwcqRKwEnOifDRrq@dev.zzd5rac.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully");

  const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
  });

  const Item = mongoose.model("Item", itemSchema);

  const newItem = new Item({ name: "Apple", price: 30 });
  newItem.save(function (err, item) {
    if (err) return console.error(err);
    console.log(item.name + " saved to collection.");

    Item.find(function (err, items) {
      if (err) return console.error(err);
      console.log(items);
      db.close(); // ปิดการเชื่อมต่อเมื่อทำงานเสร็จ
    });
  });
});
