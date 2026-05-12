import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { useForm } from "react-hook-form";

export const ResetPasswordPage = () => {

   const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate()
    const { resetPassword, loading } = useAuthStore()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()


    const onSubmit = async (data) => {
        console.log("Token:", token)
        console.log(data)
        if (data.newPassword !== data.confirmPassword) {
            showError("Las contraseñas no coinciden");
            return;
        }

        const { success, error } = await resetPassword(token, data.newPassword);

        if (success) {
            showSuccess("Contraseña actualizada correctamente");
            navigate("/");
        } else {
            showError(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-8 bg-white shadow-md rounded">
                <h2 className="text-xl font-bold">Crear nueva contraseña</h2>

                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    {...register("newPassword", {
                        required: "La contraseña es obligatoria",
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres"
                        }
                    })}
                    className="p-2 border rounded"
                />
                {errors.newPassword && (
                    <p className="text-red-600 text-xs">
                        {errors.newPassword.message}
                    </p>
                )}

                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    {...register("confirmPassword", {
                        required: "La confirmación de la contraseña es obligatoria",
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres"
                        }
                    })}
                    className="p-2 border rounded"
                />
                {errors.confirmPassword && (
                    <p className="text-red-600 text-xs">
                        {errors.confirmPassword.message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="p-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
                >
                    {loading ? "Actualizando..." : "Restablecer Contraseña"}
                </button>
            </form>
        </div>
    );
};