// hooks/useAuthGuard.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthGuard = () => {
  const router = useRouter();
  
  useEffect(() => {
    const auth = getAuth(); // Initialize Firebase auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no user is logged in, redirect to the signup page
        router.push('/signup');
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [router]);
};

export default useAuthGuard;





//use like this 

// // pages/dashboard.tsx
// "use client";

// import useAuthGuard from "@/hooks/useAuthGuard";

// export default function Dashboard() {
//   // Use the auth guard to protect the page
//   useAuthGuard();

//   return (
//     <div>
//       <h1>Welcome to your Dashboard!</h1>
//       {/* Dashboard content here */}
//     </div>
//   );
// }
