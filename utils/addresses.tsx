import bs58 from 'bs58';
export function replaceSolanaAddressesWithTruncated(inputString: string): string {
  const addressLength = 32; // 32 bytes for Solana addresses
  const base58Pattern = /[1-9A-HJ-NP-Za-km-z]{44}/g; // Base58 pattern for Solana addresses

  const modifiedString = inputString.replace(base58Pattern, (match) => {
    const decoded = bs58.decode(match);

    if (decoded.length === addressLength) {
      // Truncate to the desired format: "xxxx...xxxx"
      return `${match.slice(0, 4)}...${match.slice(-4)}`;
    }

    // If not a valid Solana address, return the original match
    return match;
  });

  return modifiedString;
}
