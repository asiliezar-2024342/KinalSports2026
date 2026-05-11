import { Routes, Route } from "react-router-dom"
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx"
import DashboardPage from "../layouts/DashboardPage.jsx"
import { Users } from "../../features/users/components/Users.jsx"
import { Field } from "../../features/fields/components/Field.jsx"
import VerifyEmailPage from "../../features/auth/pages/VerifyEmailPage.jsx"
import { UnauthorizedPage } from "../../features/auth/pages/UnauthorizedPage.jsx"
import { ProtectedRoutes } from "./ProtectedRoutes.jsx"
import { RoleGuard } from "./RoleGuard.jsx"

export const AppRoutes = () => {
    return (
        <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path="/" element={<AuthPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* PROTECTED ROUTES + ROLE */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoutes>
                        <RoleGuard allowedRole={["ADMIN_ROLE"]}>
                            <DashboardPage />
                        </RoleGuard>
                    </ProtectedRoutes>
                }
            >
                <Route path="users" element={<Users />} />
                <Route path="fields" element={<Field />} />
            </Route>
        </Routes>
    )
}