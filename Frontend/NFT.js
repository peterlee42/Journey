const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const path = require('path');
const fs = require('fs');

const { MersenneTwister19937, bool, real } = require('random-js')

const layersPath = path.join(process.cwd(), 'layers');

function saveBase64Image(base64PngImage, filename) {
    let base64 = base64PngImage.split(',')[1];
    let imageBuffer = Buffer.from(base64, 'base64');
    fs.writeFileSync(filename, imageBuffer);
}

async function mergeLayersAndSave(layers, outputFile) {
    const image = await mergeImages(layers, { Canvas: Canvas, Image: Image });
    saveBase64Image(image, outputFile);

}
//mergeLayersAndSave(layers, path.join(process.cwd(), 'output', 'thirdNFT.png'));


function randomlySelectLayers(layersPath, layers) {
    const mt = MersenneTwister19937.autoSeed();

    let images = [];
    let selectedTraits = {}

    for (const layer of layers) {
        if (bool(layer.probability)(mt)) {
            let selected = pickWeighted(mt, layer.options)
            selectedTraits[layer.name] = selected.name
            images.push(path.join(layersPath, selected.file))
        }
    }

    return {
        images,
        selectedTraits
    }
}

function pickWeighted(mt, options) {
    const weightSum = options.reduce((acc, option) => {
        return acc + (option.weight ?? 1.0)
    }, 0)

    const r = real(0.0, weightSum, false)(mt)

    let summedWeight = 0.0;
    for (const option of options) {
        summedWeight += option.weight ?? 1.0
        if (r <= summedWeight) {
            return option
        }
    }

}

async function generateNFTs(num, layersPath, outputPath) {
    const content = require(layersPath + "/content")

    let generated = new Set()

    for (let tokenId = 0; tokenId < num; tokenId++) {
        console.log(`Generating NFT #${tokenId} ...`)
        let selection = randomlySelectLayers(layersPath, content.layers)
        const traits = JSON.stringify(selection.selectedTraits);
        if (generated.has(traits)) {
            console.log("Duplicate detected. Retry...")
            tokenId--
            continue
        }
        else {
            await mergeLayersAndSave(
                selection.images, path.join(outputPath, `${tokenId}.png`)
            )
        }
    }
}

let outputPath = path.join(process.cwd(), 'output');
generateNFTs(20, layersPath, outputPath)