const bcrypt = require("bcrypt");
const saltrounds = 10;

const prisma = require("../prisma/client");

const getUsers = async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
};

const addUser = async (req, res) => {
  const { password, ...userData } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    const newUser = await prisma.user.create({
      data: { password: hashedPassword, ...userData },
    });
    res.json(newUser);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const param_id = req.params.id;
    const newPhone = req.body.phone;
    const updatedUser = await prisma.user.update({
      where: { userId: param_id },
      data: { phone: newPhone },
    });
    res.json(updatedUser);
  } catch (error) {
    res.json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("delete user")
    const param_id = req.params.id;
    const deletedUser = await prisma.user.delete({
      where: { userId: param_id },
    });
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
