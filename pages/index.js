import Head from "next/head";
import Link from "next/link";
import withPublicAccess from "../hooks/withPublicAccess";

function Home() {
  return (
    <div>
      <Head>
        <title>Pergalum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          <Link href="/login">Click here for Login</Link>
        </h1>
        <h1 style={{ marginTop: "20px" }}>
          <Link href="/new-user-form">Click here to complete form</Link>
        </h1>
      </main>
    </div>
  );
}
export default withPublicAccess(Home);
