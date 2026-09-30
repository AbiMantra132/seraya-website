const { execSync } = require('child_process');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8').split('\n');
for (const line of env) {
  if (!line || !line.includes('=')) continue;
  const [key, ...rest] = line.split('=');
  let value = rest.join('=').trim();
  
  // Remove surrounding quotes if they exist
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.substring(1, value.length - 1);
  }

  if (key && value) {
    console.log(`Setting ${key} in Vercel...`);
    try {
      execSync(`npx -y vercel env rm ${key} production -y`, { stdio: 'ignore' });
    } catch (e) {
      // ignore if it doesn't exist
    }
    try {
      execSync(`npx -y vercel env add ${key} production`, { input: value + '\n' });
      console.log(`Successfully set ${key}`);
    } catch (e) {
      console.log(`Failed to set ${key}`, e.message);
    }
  }
}
console.log("All environment variables have been set. Proceeding to deploy...");
