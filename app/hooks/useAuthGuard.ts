import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthGuard = () => {
  const [loading, setLoading] = useState(true); // Track auth check status
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/signup"); // Use `replace` to avoid going back
      } else {
        setLoading(false); // Auth check complete, allow rendering
      }
    });

    return () => unsubscribe();
  }, [router]);

  return loading; // Return loading state
};

export default useAuthGuard;
