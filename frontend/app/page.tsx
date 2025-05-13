import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ClientPage from "./pages/ClientPage";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <p className="text-center mt-10">Please log in to access the camera.</p>
    );
  }

  return <ClientPage />;
}
