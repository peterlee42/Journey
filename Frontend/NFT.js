const mergeImages = require('merge-images');
const { Canvas, Image, createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');

const { MersenneTwister19937, bool, real } = require('random-js');

function saveBase64Image(base64PngImage, filename) {
    let base64 = base64PngImage.split(',')[1];
    let imageBuffer = Buffer.from(base64, 'base64');
    fs.writeFileSync(filename, imageBuffer);
}

async function mergeLayersAndSave(layers, text, outputFile) {
    const canvas = createCanvas(512, 512); // ADJUST SIZE
    const ctx = canvas.getContext('2d');

    //IMAGE LAYERS
    for (let i = 0; i < layers.length; i++) {
        const image = await loadImage(layers[i]);
        ctx.drawImage(image, 0, 0);
    }

    // TEXT
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.width - 25);

    const base64Image = canvas.toDataURL();
    saveBase64Image(base64Image, outputFile);
}

function randomlySelectLayers(layersPath, layers) {
    const mt = MersenneTwister19937.autoSeed();

    let images = [];
    let selectedTraits = {};

    for (const layer of layers) {
        if (bool(layer.probability)(mt)) {
            let selected = pickWeighted(mt, layer.options);
            selectedTraits[layer.name] = selected.name;
            images.push(path.join(layersPath, selected.file));
        }
    }

    return {
        images,
        selectedTraits,
    };
}

function pickWeighted(mt, options) {
    const weightSum = options.reduce((acc, option) => {
        return acc + (option.weight ?? 1.0);
    }, 0);

    const r = real(0.0, weightSum, false)(mt);

    let summedWeight = 0.0;
    for (const option of options) {
        summedWeight += option.weight ?? 1.0;
        if (r <= summedWeight) {
            return option;
        }
    }
}

async function generateNFTs(layersPath, outputPath, text) {
    const content = require(path.join(layersPath, 'content'));

    let generated = new Set();

    console.log(`Generating NFT ...`);
    let selection = randomlySelectLayers(layersPath, content.layers);
    const traits = JSON.stringify(selection.selectedTraits);
    if (generated.has(traits)) {
        console.log('Duplicate detected. Retry...');
    } else {
        generated.add(traits);
        await mergeLayersAndSave(selection.images, text, path.join(outputPath, '1.png'));
    }
}

const layersPath = path.join(process.cwd(), 'layers');
let outputPath = path.join(process.cwd(), 'output');

let text = "TIM HORTONS";

generateNFTs(layersPath, outputPath, text);
