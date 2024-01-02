import { AuthProvider } from "../../context/auth-context";
import { SnackbarProvider } from "../../context/snackBar-context";
import { NotificationsProvider } from "../../context/notifications-context";
import { DataProvider } from "../../context/customers-context";

export default function ProvidersWrapper({ children }) {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <NotificationsProvider>
          <DataProvider>{children}</DataProvider>
        </NotificationsProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}
