import { useState } from "react";
import Button from "../../components/common/Button";
import { showDialog } from "../../components/common/Dialog";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { Loader } from "../../components/common/Loader";

export const UserProfile = () => {
  const { user, refreshUser } = useAuth();
  const { deleteUser, updateUser, isLoading } = useUser();

  const [formData, setFormData] = useState({
    name: user.name || "",
    lastname: user.lastname || "",
    email: user.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser(formData);
    await refreshUser();
  };

  const handleDeleteUser = () => {
    showDialog({
      content: (
        <div className="flex flex-col gap-4 text-center">
          <p className="text-lg text-gray-800">
            ¿Está seguro que desea eliminar su cuenta?
          </p>
          <aside className="flex justify-center gap-4 mt-2">
            <button
              onClick={async() => {
                await deleteUser();
                await refreshUser();
              }}
              className="px-4 py-2 bg-red-600 text-white uppercase tracking-wide border border-red-700 hover:bg-red-700 active:bg-red-800 transition-colors"
            >
              Eliminar
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white uppercase tracking-wide border border-gray-600 hover:bg-gray-600 active:bg-gray-700 transition-colors"
              onClick={() => {
                const dialog = document.querySelector("dialog");
                if (dialog) {
                  dialog.close();
                  dialog.remove();
                }
              }}
            >
              Cancelar
            </button>
          </aside>
        </div>
      ),
    });
  };

  if (isLoading) return <Loader />

  return (
    <section className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white border-2 border-gray-400 w-full max-w-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">
          Perfil del Usuario
        </h3>

        <div className="flex items-center gap-6 mb-8">
          <img
            src={user.avatar || 'https://raw.githubusercontent.com/solidsnk86/taskApp-doubleCommit/refs/heads/master/public/user_avatar_default.png'}
            width={90}
            height={90}
            alt={`Avatar del usuario ${user.name}`}
            className="border-2 border-gray-400 object-cover"
          />
          <div>
            <p className="text-lg font-medium text-gray-900">{user.name}, {user.lastname}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Formulario de actualización */}
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col text-sm text-gray-700 uppercase tracking-wide">
              Nombre
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900"
              />
            </label>

            <label className="flex flex-col text-sm text-gray-700 uppercase tracking-wide">
              Apellido
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="border-2 border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900"
              />
            </label>
          </div>

          <label className="flex flex-col text-sm text-gray-700 uppercase tracking-wide">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-gray-400 px-3 py-2 focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900"
            />
          </label>

          <div className="flex justify-end gap-4 pt-4 border-t-2 border-gray-300">
            <Button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white border border-blue-700 uppercase tracking-wide hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              Guardar Cambios
            </Button>
            <Button
              onClick={handleDeleteUser}
              className="px-5 py-2 bg-red-600 text-white border border-red-700 uppercase tracking-wide hover:bg-red-700 active:bg-red-800 transition-colors"
            >
              Eliminar Cuenta
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
