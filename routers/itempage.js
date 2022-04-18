const express = require("express");
const res = require("express/lib/response");
const Item = require("../schemas/item");
const router = express.Router();




//전체 상품조회  (랜덤정렬필요)
router.get('/main',async(req,res)=>{
    const item = await Item.find({});
    return res.status(201).json(item);
})

//베스트 페이지
router.get('/bestItem',async(req,res)=>{
    const item = await Item.find({})
    
    const bestItem = item.sort((a,b)=>{
        b.cartCount - a.cartCount
    })
    return res.status(201).json(bestItem);
    
})
//카테고리별 페이지
router.get('/:category', async(req,res)=>{
    const category = req.params.category
    const itemInCategory = await Item.find({itemCategory: category});
    return res.status(201).json(itemInCategory)
});
//디테일페이지 
router.get('/:detail', async(req,res)=>{
    const itemId = req.params;
    const item = await Item.find({itemId:itemId});
    
    return res.status(201).json(item);
})

module.exports = router;