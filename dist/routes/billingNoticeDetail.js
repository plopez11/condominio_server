"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const billingNoticeDetail_1 = require("../models/billingNoticeDetail");
const file_system_1 = __importDefault(require("../classes/file-system"));
const billingNoticeDetailRoutes = (0, express_1.Router)();
const fileSystem = new file_system_1.default();
//obtener position paginados
billingNoticeDetailRoutes.get('/', async (req, res) => {
    console.log("paso by page");
    let pagina = Number(req.query.pagina) || 1;
    if (pagina === 0)
        pagina = 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const billingNoticeDetail = await billingNoticeDetail_1.BillingNoticeDetail.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('billingNotice')
        .populate('builder')
        .populate('apartment')
        .populate('user', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        billingNoticeDetail
    });
});
//crear billingNotice
billingNoticeDetailRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.user = req.user._id;
    // const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    // body.imgs = imagenes;    
    billingNoticeDetail_1.BillingNoticeDetail.create(body).then(async (BillingNoticeDetailDB) => {
        res.json({
            ok: true,
            Post: BillingNoticeDetailDB
        });
    }).catch(err => {
        res.json(err);
    });
});
billingNoticeDetailRoutes.get('/notice/:billId', async (req, res) => {
    const NoticeDetailId = req.params.billId;
    console.log("paso by billId", NoticeDetailId);
    const billingNoticeDetail = await billingNoticeDetail_1.BillingNoticeDetail
        .find({ billingNotice: NoticeDetailId });
    if (billingNoticeDetail) {
        res.json({
            ok: true,
            billingNoticeDetail
        });
    }
    else {
        res.status(400).json({
            msg: `No existe el usuario con el id ${NoticeDetailId}`
        });
    }
});
exports.default = billingNoticeDetailRoutes;
