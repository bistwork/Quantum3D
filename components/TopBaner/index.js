import { Paper, Breadcrumbs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "./TopBaner.module.css";
import Link from "next/link";
import formatters from "../../utils/formatters";

export default function TopBaner() {
  const router = useRouter();
  const { asPath } = router;
  const segments = asPath.split("/").filter(Boolean);

  return (
    <Paper className={`${styles.paper} ${styles.flexContainer}`} elevation={0}>
      <Typography className={styles.mainLabel}>
        {segments[segments.length - 1].toUpperCase()}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        {segments.map((segment, index) => (
          <Link
            key={segment}
            href={`/${segments.slice(0, index + 1).join("/")}`}
          >
            {formatters.capitalizeFirstLetter(segment)}
          </Link>
        ))}
      </Breadcrumbs>
    </Paper>
  );
}
