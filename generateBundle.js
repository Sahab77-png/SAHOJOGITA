const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');
const entryFile = path.resolve(__dirname, 'index.js');
const bundleOutput = path.resolve(
  __dirname,
  'android/app/src/main/assets/index.android.bundle'
);
const assetsDest = path.resolve(__dirname, 'android/app/src/main/res');
const platform = process.platform;
let hermescPath;
if (platform === 'win32') {
  hermescPath = path.resolve(__dirname, 'node_modules', 'hermes-engine', 'win64-bin', 'hermesc.exe');
} else if (platform === 'darwin') {
 hermescPath = path.resolve(__dirname, 'node_modules', 'hermes-engine', 'osx-bin', 'hermesc');
} else {
  hermescPath = path.resolve(__dirname, 'node_modules', 'hermes-engine', 'linux64-bin', 'hermesc');
}
console.log('Resolved Entry File Path:', entryFile);
console.log('Bundle Output:', bundleOutput);
console.log('Assets Destination:', assetsDest);
console.log('Detected Hermes compiler path:', hermescPath);
const assetsDir = path.dirname(bundleOutput);
if (!fs.existsSync(assetsDir)) {
  console.log('Creating assets directory:',assetsDir);
  fs.mkdirSync(assetsDir, {recursive: true});
}
console.log('Step 1: Generating standard JS bundle...');
const bundleCommand = [
  'npx',
  'react-native',
  'bundle',
  '--platform',
  'android',
  '--dev',
  'false',
  '--entry-file',
  entryFile,
  '--bundle-output',
  bundleOutput,
  '--assets-dest',
  assetsDest,
];
try {
  execSync(bundleCommand.join(' '), { stdio: 'inherit' });
  console.log('JS bundle generated successfully');
} catch (error) {
  console.error('Error generating the bundle:', error.message);
  process.exit(1);
}
console.log('Step 2: Compiling bundle to Hermes bytecode...');
try {
  const hermesCommand = `"${hermescPath}" -emit-binary -out "${bundleOutput}.hbc" "${bundleOutput}"`;
  console.log('Running Hermes command:', hermesCommand);
  execSync(hermesCommand, {stdio: 'inherit'});
  fs.unlinkSync(bundleOutput);
  fs.renameSync(`${bundleOutput}.hbc`, bundleOutput);
  console.log('Hermes bytecode bundle created successfully.');
} catch(error) {
  console.error('Hermes compilation failed. Using plain JS bundle instead.', error.message);
  process.exit(2);
}
console.log('Bundle generation complete!');
