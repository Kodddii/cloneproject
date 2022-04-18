const express = require("express");
const res = require("express/lib/response");
const Item = require("../schemas/item");
const router = express.Router();




//전체 상품조회  (랜덤정렬필요)
router.get('/main',async(req,res)=>{
    console.log("여기지나침")
    const item = await Item.find({});
    console.log("여기지나친거같은데")
    return res.status(201).json(item);
})

//베스트 페이지
router.get('/bestItem',async(req,res)=>{
    const item = await Item.find({})
    console.log("지나친거 다안다")
    const bestItem = item.sort((a,b)=>{
        b.cartCount - a.cartCount
    })
    return res.status(201).json(bestItem);
    
})
//카테고리별 페이지
router.get('/category/:category', async(req,res)=>{
    console.log("카테고리")
    const category = req.params.category
    const itemInCategory = await Item.find({itemCategory: category});
    return res.status(201).json(itemInCategory)
});
//디테일페이지 
router.get('/detail/:detail', async(req,res)=>{
    console.log("디테일")
    const itemId = req.params;
    const item = await Item.find({itemId:itemId});
    
    return res.status(201).json(item);
})

module.exports = router;