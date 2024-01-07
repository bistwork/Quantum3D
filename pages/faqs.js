import Head from "next/head";
import styles from "../styles/terms.module.css";
import withPublicAccess from "../hooks/withPublicAccess";

function Faqs(){

    return (
        <div className={styles.termsPage}>
          <Head>
            <title>FAQs</title>
          </Head>
    
          <div className={styles.headerContainer}>
            <h4 className={styles.title}>FAQs</h4>
            <p className={styles.headerSubTitle}> Frequently Asked Questions</p>
          </div>
          <div className={styles.termsContentContainer}>
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
          </div>
    
          {/* ... add more sections as needed */}
        </div>
      );
    }

export default withPublicAccess(Faqs);