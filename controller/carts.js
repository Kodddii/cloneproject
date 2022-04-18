const Cart = require("../schemas/carts");
const Posts = require("../schemas/pages");
 
//장바구니에 상품 담기
const addCart = async (req, res) => {
const itemId = req.params;
// const item = Item.findOne({ _Id: itemId });
 const { itemName, itemAmount, itemPrice, itemImg } = req.body;
 await addCart.create({
    itemId,
    itemName: itemName,
    itemAmount: itemAmount,
    itemPrice: itemPrice,
    itemImg: itemImg
  });
  res.json({ itemName, itemAmount, itemPrice, itemImg });
};
 
 //장바구니 조회
 const getCart = async (req, res) => {
  const carts = await Cart.find();
  const results = carts.map((cart) => {
    return {
      quantity: cart.itemAmount,
      item: itempage.find((item) => item.itemId === cart.itemId),
    };
  });
  res.json({ carts: results });
};