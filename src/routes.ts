import { Router } from "express";

import { WeaponsController } from "./models/weapons.controller";
import { WeaponsInfoController } from "./models/weapons-info.controller";

import { BundlesController } from "./models/bundles.controller";
import { BuddiesController } from "./models/buddies.controller";
import { SpraysController } from "./models/sprays.controller";
import { TitlesController } from "./models/titles.controller";
import { CardsController } from "./models/cards.controller";
import { SkinsController } from './models/skins.controller';
import { ChromasController } from './models/chromas.controller';
import { LevelsController } from './models/levels.controller';
import { getInfo } from "./utils";


const weaponsController = new WeaponsController();
const weaponsInfoController = new WeaponsInfoController();
const bundlesController = new BundlesController();
const bunddiesController = new BuddiesController();
const spraysController = new SpraysController();
const titlesController = new TitlesController();
const cardsController = new CardsController();
const skinsController = new SkinsController();
const levelsController = new LevelsController();
const chromasController = new ChromasController();

const router = Router();


router.get("/weapons", weaponsController.getAll);
router.get("/weapons/:id", weaponsController.getById);
router.get("/weaponsinfo", weaponsInfoController.getAll);
router.get("/weaponsinfo/:id", weaponsInfoController.getById);
router.get("/weaponsinfo/weapon/:id", weaponsInfoController.getByWeaponId);
router.get("/bundles", bundlesController.getAll);
router.get("/bundles/:id", bundlesController.getById);
router.get("/buddies", bunddiesController.getAll);
router.get("/buddies/:id", bunddiesController.getById);
router.get("/buddies/bundle/:id", bunddiesController.getByBundleId);
router.get("/sprays", spraysController.getAll);
router.get("/sprays/:id", spraysController.getById);
router.get("/sprays/bundle/:id", spraysController.getByBundleId);
router.get("/titles", titlesController.getAll);
router.get("/titles/:id", titlesController.getById);
router.get("/titles/bundle/:id", titlesController.getByBundleId);
router.get("/cards", cardsController.getAll);
router.get("/cards/:id", cardsController.getById);
router.get("/cards/bundle/:id", cardsController.getByBundleId);
router.get("/skins", skinsController.getAll);
router.get("/skins/:id", skinsController.getById);
router.get("/skins/bundle/:id", skinsController.getByBundleId);
router.get("/skins/weapon/:id", skinsController.getByWeaponId);
router.get("/levels", levelsController.getAll);
router.get("/levels/:id", levelsController.getById);
router.get("/levels/skin/:id", levelsController.getBySkinId);
router.get("/chromas", chromasController.getAll);
router.get("/chromas/:id", chromasController.getById);
router.get("/chromas/skin/:id", chromasController.getBySkinId);
router.get("/info", (req, res) => {
    return res.json(getInfo());
});

export { router };