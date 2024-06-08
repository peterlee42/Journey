const mergeImages = require('merge-images');
const { Canvas, Image, createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MDIwMjNjYS1hMjczLTRiMDItOGJhMC02ZGU5YTRkMWVlNDUiLCJlbWFpbCI6ImV2ZXJ5dGhpbmdpc2tpbWNoaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWRkMTc4MGZlZjZiY2EzOTAxMzEiLCJzY29wZWRLZXlTZWNyZXQiOiIxZGJjMTc1NDE3ZWE5MzI1OTJiM2EzMjUxZjk1Y2M5NDZhZTU0ZTA2OTNhMzdhNDNlNTQxYTliYmNjYmZhMjUxIiwiaWF0IjoxNzE3ODY4MTczfQ.M0wglQXml5pzMeOXbKwf8JXXxMz7-J2WYdxeEBhhZyg"
const CROSSMINT_PROJECT = "b94a6ea2-a682-467b-a654-3417648e4e7a"
const CROSSMINT_KEY = "sk_staging_9tarQtZKZvn7k5a7ELqzLSHERe9EJ8ByUe7pjirgq1FzDp6ErVT3GCdssTSJLd6akJZYhBeGQNEDCP5jzHdZH9FSn2tLdKx7t6s8bzWZuFUXyoPqZgQ1zS6WFnZHB7Y3zVER1p7cEs45BRuHMUUd75fHDYuUVnW8mhrc7G3ywp2QAqQbdJsn64gi2DoFiZZy1UnCAJV2iay1Jnsu1yQjgdhw"
const FormData = require("form-data")
const fetch = require("node-fetch")

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

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

const uploadImage = async (file) => {
    try {
        const data = new FormData()
        data.append("file", fs.createReadStream(file))
        data.append("pinataMetadata", '{"name": "pinnie"}')

        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JWT}`
            },
            body: data
        })
        resData = await res.json()
        console.log("File uploaded, CID:", resData.IpfsHash)
        return resData.IpfsHash
    } catch (error) {
        console.log(error)
    }
}

const uploadMetadata = async (name, description, external_url, CID) => {
    try {
        const data = JSON.stringify({
            pinataContent: {
                name: `${name}`,
                description: `${description}`,
                external_url: `${external_url}`,
                image: `ipfs://${CID}`,
            },
            pinataMetadata: {
                name: "Pinnie NFT Metadata",
            },
        });

        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            },
            body: data
        })
        const resData = await res.json()
        console.log("Metadata uploaded, CID:", resData.IpfsHash)
        return resData.IpfsHash
    } catch (error) {
        console.log(error)
    }
}

const mintNft = async (CID, wallet) => {
    try {
        const data = JSON.stringify({
            recipient: `polygon-amoy:${wallet}`,
            metadata: `https://gateway.pinata.cloud/ipfs/${CID}`
        })
        const res = await fetch("https://staging.crossmint.com/api/2022-06-09/collections/cbfff921-aabc-43cc-b131-d03fee5d43d0/nfts", {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'x-client-secret': `${CROSSMINT_KEY}`,
                'x-project-id': `${CROSSMINT_PROJECT}`
            },
            body: data
        })
        resData = await res.json()
        const contractAddress = resData.onChain.contractAddress
        console.log("NFT Minted, smart contract:", contractAddress)
    } catch (error) {
        console.log(error)
    }
}

const main = async (file, name, description, external_url, wallet) => {
    try {
        const imageCID = await uploadImage(file)
        const metadataCID = await uploadMetadata(name, description, external_url, imageCID)
        await mintNft(metadataCID, wallet)
    } catch (error) {
        console.log(error)
    }
}

// main("./output/0.png", "Test", "This is a test NFT!", "https://jamhacks.ca", "0xc9947a55bDD4b1E0fE27fDA4EEc68C74505307b7");

app.post("/generate_nft", async function (req, res) {
    console.log(req.body)
    let text = "Engineering 7";
    const layersPath = path.join(process.cwd(), 'layers');
    let outputPath = path.join(process.cwd(), 'output');    
    // await generateNFTs(layersPath, outputPath, text);
    // await main("./output/1.png", "Test", "This is a test NFT!", "https://jamhacks.ca", "0xc9947a55bDD4b1E0fE27fDA4EEc68C74505307b7");
    res.send(JSON.stringify({"successful": true}));
});



test = async () => {
    try {
        const res = await fetch("http://localhost:3000/generate_nft", {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({"Hi": "HII"})
        })
        resData = await res.json()
        console.log(resData)
    } catch (error) {
        console.log(error)
      }
}

test()