const mongoose = require('mongoose');

// URI การเชื่อมต่อกับ MongoDB Server นอก
const remoteDbUri = 'mongodb+srv://suriya_p:GwcqRKwEnOifDRrq@dev.zzd5rac.mongodb.net/message';

mongoose.connect(remoteDbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected successfully to remote MongoDB");

  // ที่นี่คุณสามารถเพิ่มโค้ดการทำงานกับฐานข้อมูลของคุณ...




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
