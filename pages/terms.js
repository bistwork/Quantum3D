import Head from "next/head";
import styles from "../styles/terms.module.css";
import withPublicAccess from "../hooks/withPublicAccess";

function TermsAndConditions() {
  return (
    <div className={styles.termsPage}>
      <Head>
        <title>Terms and Conditions</title>
      </Head>

      <h1 className={styles.title}>Terms and Conditions</h1>

      <section>
        <h2 className={styles.subTitle}>1. Introduction</h2>
        <p className={styles.paragraph}>
          These terms and conditions govern your use of this website...
        </p>
      </section>

      <section>
        <h2 className={styles.subTitle}>2. Copyright Information</h2>
        <p className={styles.paragraph}>
          All the content of this website belongs to [Your Name/Company]...
        </p>
      </section>

      {/* ... add more sections as needed */}
    </div>
  );
}

export default withPublicAccess(TermsAndConditions);
