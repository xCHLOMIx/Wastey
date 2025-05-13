'use client';
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  async function addPoints() {
    const res = await fetch("/api/points", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, pointsToAdd: 5 }),
    });

    const data = await res.json();
    console.log("New Points:", data.points);
  }
  
  return (
    <div>
      <form>
        <h1>Welcome to Wastey</h1>
        {session ? (
          <>
            <p>Signed in as {session.user.email}</p>
            <p>Your points: {session.user.points}</p>
            <button type="button" onClick={addPoints}>Add Points</button>
            <button type="button" onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <p>You are not signed in</p>
            <button type="button" onClick={() => signIn("google")}>Sign in with Google</button>
          </>
        )}
      </form>
    </div>
  );
}
