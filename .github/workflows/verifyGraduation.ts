import {
  Connection,
  PublicKey,
} from "@solana/web3.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// Constants
const MINT_ADDRESS = new PublicKey("DnUsQnwNot38V9JbisNC18VHZkae1eKK5N2Dgy55pump");
const EXPECTED_AUTHORITY = null; // Or a PublicKey if reassigned
const RAYDIUM_LISTING_TOKEN = "51ey1T4UCFwb8poVBwyiLwwi1KdNTrZ8rSg7kBRmqray";

// Solana connection
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

async function checkMintAuthority(): Promise<boolean> {
  const mintInfo = await connection.getParsedAccountInfo(MINT_ADDRESS);
  const mintData = mintInfo.value?.data;

  if (!mintData || typeof mintData === "string" || !("parsed" in mintData)) {
    throw new Error("Invalid mint account data.");
  }

  const currentAuthority = mintData.parsed.info.mintAuthority;

  if (EXPECTED_AUTHORITY === null && currentAuthority === null) {
    console.log("✅ Mint authority revoked — graduation verified.");
    return true;
  }

  if (EXPECTED_AUTHORITY && currentAuthority === EXPECTED_AUTHORITY.toBase58()) {
    console.log("✅ Mint authority matches expected.");
    return true;
  }

  console.error("❌ Mint authority mismatch.");
  console.error(`Expected: ${EXPECTED_AUTHORITY}, Found: ${currentAuthority}`);
  return false;
}

async function checkRaydiumListing(): Promise<boolean> {
  const raydiumApi = "https://api.raydium.io/pairs";
  try {
    const res = await fetch(raydiumApi);
    const pairs = await res.json();

    const match = pairs.find((pair: any) =>
      pair.baseMint === RAYDIUM_LISTING_TOKEN ||
      pair.quoteMint === RAYDIUM_LISTING_TOKEN
    );

    if (match) {
      console.log("✅ Raydium listing found.");
      return true;
    } else {
      console.error("❌ Raydium listing NOT found.");
      return false;
    }
  } catch (err) {
    console.error("❌ Error checking Raydium listing:", err);
    return false;
  }
}

(async () => {
  try {
    const mintOk = await checkMintAuthority();
    const raydiumOk = await checkRaydiumListing();

    if (mintOk && raydiumOk) {
      console.log("🎓 CHONK9K has successfully graduated.");
      process.exit(0);
    } else {
      console.error("❌ Graduation verification failed.");
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Unexpected error during graduation verification:", err);
    process.exit(1);
  }
})();
