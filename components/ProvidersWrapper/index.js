import { AuthProvider } from "../../context/auth-context";
import { SnackbarProvider } from "../../context/snackBar-context";
import { NotificationsProvider } from "../../context/notifications-context";
import { DataProvider } from "../../context/customers-context";
import {OrdersProvider } from "../../context/orders-context";

export default function ProvidersWrapper({ children }) {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <NotificationsProvider>
          <OrdersProvider>
            <DataProvider>{children}</DataProvider>
          </OrdersProvider>
        </NotificationsProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}
