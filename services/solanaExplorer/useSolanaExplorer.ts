import { useCallback } from 'react';

import useCurrentUserLoader from '../user/useCurrentUserLoader';
import { solanaExplorersMap } from '../user/user.service';

const useSolanaExplorer = () => {
  const { user } = useCurrentUserLoader();

  const explorerURLParser = useCallback(
    (txId: string) =>
      user ? solanaExplorersMap[user.preferredSolanaExplorer](txId) : solanaExplorersMap.SOLANA_EXPLORER(txId),
    [user?.preferredSolanaExplorer, user],
  );

  return { explorerURLParser };
};

export default useSolanaExplorer;
