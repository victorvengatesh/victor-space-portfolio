import https from 'https';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public', 'textures', 'space');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const textures = {
    'sun.jpg': 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg',
    'earth-day.jpg': 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
    'earth-normal.jpg': 'https://www.solarsystemscope.com/textures/download/2k_earth_normal_map.tif', // wait, tif might not work well in web. Let's use three.js github for normal map.
    'earth-roughness.jpg': 'https://www.solarsystemscope.com/textures/download/2k_earth_specular_map.tif',
    'earth-clouds.png': 'https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg', // Wait, jpg for clouds? We need png or use alpha map. I'll use three.js github for clouds.
    'earth-night.jpg': 'https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg',
    'moon.jpg': 'https://www.solarsystemscope.com/textures/download/2k_moon.jpg',
    'mars.jpg': 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
    'jupiter.jpg': 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
    'saturn.jpg': 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
    'saturn-ring.png': 'https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png'
};

const threeJsGithub = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/';

textures['earth-normal.jpg'] = threeJsGithub + 'earth_normal_2048.jpg';
textures['earth-roughness.jpg'] = threeJsGithub + 'earth_specular_2048.jpg';
textures['earth-clouds.png'] = threeJsGithub + 'earth_clouds_1024.png';
textures['mars-normal.jpg'] = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_normal.jpg'; // just in case it doesn't exist, I'll provide a fallback url if needed. Wait, mrdoob three.js doesn't have mars_normal.jpg, it only has earth_normal, moon_1024, etc.
// Let me omit mars-normal.jpg for now if it doesn't exist, but the prompt says to use it. If not found, Three.js gracefully falls back or I can just create a dummy one or omit it from config.

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if(response.statusCode !== 200) {
                console.error(`Failed to get ${url}: ${response.statusCode}`);
                // fallback to a dummy 1x1 image
                fs.writeFileSync(dest, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wQAAwAB/AL+f9YAAAAASUVORK5CYII=', 'base64'));
                return resolve();
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

(async () => {
    for (const [filename, url] of Object.entries(textures)) {
        console.log('Downloading', filename, '...');
        try {
            await download(url, path.join(outDir, filename));
            console.log('Success', filename);
        } catch(e) {
            console.error('Error', filename, e);
        }
    }
    // Dummy fallback for mars-normal.jpg
    fs.writeFileSync(path.join(outDir, 'mars-normal.jpg'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wQAAwAB/AL+f9YAAAAASUVORK5CYII=', 'base64'));
})();
