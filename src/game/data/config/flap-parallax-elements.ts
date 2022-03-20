import { Point } from "pixi.js";
import { Size } from "../../../core/data/size";
import { IParallaxElementConfig } from "../interface/flap-parallax-element-config";

export const parallaxElements: IParallaxElementConfig[][] = [
    [
        {
            assetName: "05_far_BG.jpg",  assetAtlas: "WorldAssets",
            position: new Point(0, 100), speed: 0.1, scale: new Size(1, 1.3),
            repositionAtX: -956, repositionX: 956,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        },
        {
            assetName: "05_far_BG.jpg",  assetAtlas: "WorldAssets",
            position: new Point(956, 100), speed: 0.1, scale: new Size(1, 1.3),
            repositionAtX: -956, repositionX: 956,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        }
    ],
    [
        {
            assetName: "03_rear_canopy.png", assetAtlas: "WorldAssets",
            position: new Point(0, 70), speed: 0.2, scale: new Size(1, 1.2),
            repositionAtX: -954, repositionX: 954,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        },
        {
            assetName: "03_rear_canopy.png", assetAtlas: "WorldAssets",
            position: new Point(954, 70), speed: 0.2, scale: new Size(1, 1.2),
            repositionAtX: -954, repositionX: 954,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        }
    ],
    [
        {
            assetName: "02_tree_2.png",  assetAtlas: "WorldAssets",
            position: new Point(250, 110), speed: 0.2, scale: new Size(1, 1.25),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -20), positionVariationMax: new Point(500, 20)
        },
        {
            assetName: "02_tree_2.png",  assetAtlas: "WorldAssets",
            position: new Point(250, 110), speed: 0.2, scale: new Size(1, 1.25),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -20), positionVariationMax: new Point(500, 20)
        },
        {
            assetName: "02_tree_1.png", assetAtlas: "WorldAssets",
            position: new Point(250, 110), speed: 0.2, scale: new Size(1, 1.25),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -20), positionVariationMax: new Point(500, 20)
        },
        {
            assetName: "02_tree_1.png", assetAtlas: "WorldAssets",
            position: new Point(250, 110), speed: 0.2, scale: new Size(1, 1.25),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -20), positionVariationMax: new Point(500, 20)
        }
    ],
    [
        {
            assetName: "03_rear_silhouette.png", assetAtlas: "WorldAssets",
            position: new Point(0, 600),  speed: 0.3,  scale: new Size(1, 1.2),
            repositionAtX: -1282, repositionX: 1282,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        },
        {
            assetName: "03_rear_silhouette.png", assetAtlas: "WorldAssets",
            position: new Point(1282, 600),  speed: 0.3,  scale: new Size(1, 1.2),
            repositionAtX: -1282, repositionX: 1282,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        }
    ],
    [
        {
            assetName: "01_hanging_flower3.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Size(1, 1),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower2.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Size(1, 1),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower1.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Size(1, 1),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower3.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Size(1, 1),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower2.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Size(1, 1),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower1.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Size(1, 1),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower3.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Size(1, 1),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower2.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Size(1, 1),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        },
        {
            assetName: "01_hanging_flower1.png", assetAtlas: "WorldAssets",
            position: new Point(250, -20),  speed: 0.4, scale: new Size(1, 1),
            repositionAtX: -500, repositionX: 1000,
            positionVariationMin: new Point(-500, -50), positionVariationMax: new Point(500, 150)
        }
    ],
    [
        {
            assetName: "01_front_silhouette.png", assetAtlas: "WorldAssets",
            position: new Point(0, 661),  speed: 0.5, scale: new Size(1, 1.2),
            repositionAtX: -1278, repositionX: 1278,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        },
        {
            assetName: "01_front_silhouette.png", assetAtlas: "WorldAssets",
            position: new Point(1278, 661),  speed: 0.5, scale: new Size(1, 1.2),
            repositionAtX: -1278, repositionX: 1278,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        }
    ],
    [
        {
            assetName: "02_front_canopy.png", assetAtlas: "WorldAssets",
            position: new Point(0, 50),  speed: 0.5, scale: new Size(1, 1.2),
            repositionAtX: -1056, repositionX: 1056,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        },
        {
            assetName: "02_front_canopy.png", assetAtlas: "WorldAssets",
            position: new Point(1056, 50),  speed: 0.5, scale: new Size(1, 1.2),
            repositionAtX: -1056, repositionX: 1056,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        }
    ],
    [
        {
            assetName: "00_roof_leaves.png", assetAtlas: "WorldAssets",
            position: new Point(0, -1),  speed: 0.6, scale: new Size(1, 1.2),
            repositionAtX: -1098, repositionX: 1098,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        },
        {
            assetName: "00_roof_leaves.png", assetAtlas: "WorldAssets",
            position: new Point(1098, -1),  speed: 0.6, scale: new Size(1, 1.2),
            repositionAtX: -1098, repositionX: 1098,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        },
        {
            assetName: "00_forest_floor.png", assetAtlas: "WorldAssets",
            position: new Point(-50, 685),  speed: 0.6, scale: new Size(1, 1.2),
            repositionAtX: -1268, repositionX: 950,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        },
        {
            assetName: "00_forest_floor.png", assetAtlas: "WorldAssets",
            position: new Point(1050, 685),  speed: 0.6, scale: new Size(1, 1.2),
            repositionAtX: -1268, repositionX: 950,
            positionVariationMin: new Point(0, 0), positionVariationMax: new Point(0, 0)
        }
    ]
];