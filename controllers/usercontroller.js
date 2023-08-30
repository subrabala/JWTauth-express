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
  const param_id = req.params.id;
  const newPhone = req.body.phone;
  const updatedUser = await prisma.user.update({
    where: { id: param_id },
    data: { phone: newPhone },
  });
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const param_id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: { id: param_id },
  });
  res.json(deletedUser);
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
