import { execSync } from 'child_process';

function authorizeGraduation() {
  const key = process.env.GRADUATION_KEY;
  if (key !== 'chonk-unleashed') {
    console.error('❌ Unauthorized graduation attempt.');
    process.exit(1);
  }
}

function performGraduation() {
  console.log('🚀 Initiating $CHONK9K graduation...');
  execSync('pnpm deploy:mainnet');
  console.log('✅ Graduation completed successfully.');
}

authorizeGraduation();
performGraduation();
