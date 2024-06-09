module.exports = {
    layers: [
        {
            name: "Background",
            probability: 1.0,
            options: [
                {
                    name: "B1",
                    file: "Background/B1.png",
                    weight: 1
                },
                {
                    name: "B2",
                    file: "Background/B2.png",
                    weight: 1
                },
                {
                    name: "B3",
                    file: "Background/B3.png",
                    weight: 1
                },
                {
                    name: "B4",
                    file: "Background/B4.png",
                    weight: 1
                },
                {
                    name: "B5",
                    file: "Background/B5.png",
                    weight: 1
                }
            ]
        },
        {
            name: "Cloud",
            probability: 1.0,
            options: [
                {
                    name: "Cloud",
                    file: "Cloud/cloud.png",
                    weight: 1
                },
                {
                    name: "Cloud1",
                    file: "Cloud/cloud1.png",
                    weight: 1
                },
                {
                    name: "Cloud2",
                    file: "Cloud/cloud2.png",
                    weight: 1
                }
            ]
        },
        {
            name: "Tree",
            probability: 1.0,
            options: [
                {
                    name: "Tree",
                    file: "Tree/tree.png",
                    weight: 1
                },
                {
                    name: "Tree1",
                    file: "Tree/tree1.png",
                    weight: 1
                },
                {
                    name: "Tree2",
                    file: "Tree/tree2.png",
                    weight: 1
                }
            ]
        },
        {
            name: "Bench",
            probability: 1.0,
            options: [
                {
                    name: "Bench1",
                    file: "Bench/bench1.png",
                    weight: 1
                },
                {
                    name: "Bench2",
                    file: "Bench/bench2.png",
                    weight: 1
                }
            ]
        },
        {
            name: "Rarity",
            probability: 1.0,
            options: [
                {
                    name: "Gold",
                    files: "Rarity/gold.png",
                    weight: 1
                },
                {
                    name: "Silver",
                    files: "Rarity/silver.png",
                    weight: 7
                },
                {
                    name: "Bronze",
                    files: "Rarity/bronze.png",
                    weight: 12
                }
            ]
        }
    ]
};