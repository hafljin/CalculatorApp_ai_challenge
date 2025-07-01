import { useEffect } from 'react';

export function useFrameworkReady() {
  useEffect(() => {
    // React Nativeではwindow.frameworkReadyは存在しないため、何もしない
    // このフックは将来の拡張のために残しておく
  }, []);
}
