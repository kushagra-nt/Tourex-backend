import bcryptjs from "bcryptjs";

const fun = async () => {
  let result = await bcryptjs.compare("$2a$10$7O24JvZc6SNrs7c17DDGg.JqdZo1VodWyrx//2yR6FFCKfMyNNVau", "kushagra147");
  console.log(result);
};

fun();
