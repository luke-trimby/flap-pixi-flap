import { Point } from "pixi.js";
import { Size } from "../../../core/data/size";
import { IParallaxElementConfig } from "../interface/flap-parallax-element-config";

export const parallaxElements: IParallaxElementConfig[][] = [
    [
        {
            assetName: "05_far_BG.jpg",  assetAtlas: "WorldAssets",
            position: new Point(0, 100), speed: 0.1, scale: new Point(1, 1.3),
            tiled: true, size: new Size(540, 920)
        }
    ],
    [
        {
            assetName: "03_rear_canopy.png", assetAtlas: "WorldAssets",
            position: new Point(0, 70), speed: 0.2, scale: new Point(1, 1),
            tiled: true, size: new Size(540, 250)
        },
        {
            assetName: "03_rear_silhouette.png", assetAtlas: "WorldAssets",
            position: new Point(0, 600), speed: 0.2,  scale: new Point(1, 1.4),
            tiled: true, size: new Size(540, 96)
        }
    ],
    [
        {
            assetName: "02_tree_2.png",  assetAtlas: "WorldAssets",
            position: new Point(-100, 80), speed: 0.2, scale: new Point(1, 1.4),
            tiled: false,
            repositionAtX: -350, repositionX: 750,
            positionVariationMin: new Point(0, -20), positionVariationMax: new Point(500, 20)
        },
        {
            assetName: "02_tree_2.png",  assetAtlas: "WorldAssets",
            position: new Point(0, 80), speed: 0.2, scale: new Point(1, 1.4),
            tiled: false,
            repositionAtX: -350, repositionX: 750,
            positionVariationMin: new Point(0, -20), positionVariationMax: new Point(750, 20)
        },
        {
            assetName: "02_tree_1.png", assetAtlas: "WorldAssets",
            position: new Point(250, 80), speed: 0.2, scale: new Point(1, 1.4),
            tiled: false,
            repositionAtX: -350, repositionX: 750,
            positionVariationMin: new Point(0, -20), positionVariationMax: new Point(500, 20)
        },
        {
            assetName: "02_tree_1.png", assetAtlas: "WorldAssets",
            position: new Point(500, 80), speed: 0.2, scale: new Point(1, 1.4),
            tiled: false,
            repositionAtX: -500, repositionX: 750,
            positionVariationMin: new Point(0, -20), positionVariationMax: new Point(500, 20)
        }
    ],
    [
        {
            assetName: "01_hanging_flower3.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Point(1, 1),
            tiled: false,
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower2.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Point(1, 1),
            tiled: false,
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower1.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Point(1, 1),
            tiled: false,
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower3.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Point(1, 1),
            tiled: false,
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower2.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Point(1, 1),
            tiled: false,
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower1.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Point(1, 1),
            tiled: false,
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower3.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Point(1, 1),
            tiled: false,
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower2.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Point(1, 1),
            tiled: false,
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower1.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Point(1, 1),
            tiled: false,
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        }
    ],
    [
        {
            assetName: "01_front_silhouette.png", assetAtlas: "WorldAssets",
            position: new Point(0, 661),  speed: 0.5, scale: new Point(1, 1.2),
            tiled: true, size: new Size(540, 225)
        }
    ],
    [
        {
            assetName: "02_front_canopy.png", assetAtlas: "WorldAssets",
            position: new Point(0, 45),  speed: 0.5, scale: new Point(1, 1.3),
            tiled: true, size: new Size(540, 176)
        }
    ],
    [
        {
            assetName: "00_roof_leaves.png", assetAtlas: "WorldAssets",
            position: new Point(0, -1),  speed: 0.6, scale: new Point(1, 1.2),
            tiled: true, size: new Size(540, 110)
        },
        {
            assetName: "00_forest_floor.png", assetAtlas: "WorldAssets",
            position: new Point(-50, 685),  speed: 0.6, scale: new Point(1, 1.2),
            tiled: false,
            repositionAtX: -1268, repositionX: 950,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        },
        {
            assetName: "00_forest_floor.png", assetAtlas: "WorldAssets",
            position: new Point(1050, 685),  speed: 0.6, scale: new Point(1, 1.2),
            tiled: false,
            repositionAtX: -1268, repositionX: 950,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        }
    ]
];