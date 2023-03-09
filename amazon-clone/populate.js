require("dotenv").config();
const Product = require("./models/product");
const jsonProducts = require("./data.json");
const connectDB = require("./db/connectDB");

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log(`Products successfully added to database`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
populate();
