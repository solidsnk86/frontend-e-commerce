import { useState, useRef } from "react";
import { showDialog, closeDialog } from "../../components/common/Dialog";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { Loader } from "../../components/common/Loader";
import { Camera, User, Mail, Save, Trash2, Edit3 } from "lucide-react";

export const UserProfile = () => {
  const { user, refreshUser } = useAuth();
  const { deleteUser, updateUser, isLoading } = useUser();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user.name || "",
    lastname: user.lastname || "",
    email: user.email || "",
    avatar: user.avatar || ""
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser(formData);
    await refreshUser();
    setIsEditing(false);
    showDialog({
      title: "¡Listo!",
      content: (
        <div className="text-center py-2">
          <div className="w-12 h-12 bg-[#F8F8F8] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-[#6B6B6B] font-sans-elegant">Tu perfil ha sido actualizado correctamente.</p>
        </div>
      ),
    });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showDialog({
        title: "Error",
        content: <p className="text-[#6B6B6B] font-sans-elegant">Por favor selecciona un archivo de imagen válido.</p>,
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showDialog({
        title: "Error",
        content: <p className="text-[#6B6B6B] font-sans-elegant">La imagen no debe superar los 5MB.</p>,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
      setFormData(prev => ({ ...prev, avatar: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteUser = () => {
    showDialog({
      title: "Eliminar cuenta",
      content: (
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F8F8F8] rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-[#1A1A1A]" />
          </div>
          <p className="text-[#1A1A1A] font-sans-elegant font-medium mb-2">
            ¿Estás segura de eliminar tu cuenta?
          </p>
          <p className="text-sm text-[#6B6B6B] font-sans-elegant mb-6">
            Esta acción no se puede deshacer. Se eliminarán todos tus datos permanentemente.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={closeDialog}
              className="px-5 py-2.5 border border-[#E5E5E5] text-[#6B6B6B] font-sans-elegant text-xs tracking-wide uppercase hover:bg-[#F8F8F8] transition-all duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                await deleteUser();
                await refreshUser();
                closeDialog();
              }}
              className="px-5 py-2.5 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-wide uppercase hover:bg-[#333333] transition-all duration-200"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      ),
    });
  };

  if (isLoading) return <Loader />;

  const defaultAvatar = 'https://raw.githubusercontent.com/solidsnk86/taskApp-doubleCommit/refs/heads/master/public/user_avatar_default.png';

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[#6B6B6B] font-sans-elegant text-xs tracking-[0.3em] uppercase mb-3">
            Mi Cuenta
          </p>
          <h1 className="text-2xl font-sans-elegant uppercase tracking-wider text-[#1A1A1A]">
            Perfil de Usuario
          </h1>
          <div className="w-12 h-[1px] bg-[#E5E5E5] mx-auto mt-4"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-[#E5E5E5]">
          {/* Avatar Section */}
          <div className="relative bg-gradient-to-b from-[#F8F8F8] to-white pt-8 pb-16 px-8">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-sans-elegant tracking-wide uppercase transition-all duration-200 ${
                  isEditing 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                <Edit3 size={14} />
                {isEditing ? 'Editando' : 'Editar'}
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              {/* Avatar con botón de cambio */}
              <div className="relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={avatarPreview || user.avatar || defaultAvatar}
                    alt={`Avatar de ${user.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {isEditing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-md hover:bg-[#333333] transition-colors duration-200"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Nombre y rol */}
              <div className="mt-4 text-center">
                <h2 className="text-lg font-sans-elegant uppercase tracking-wide text-[#1A1A1A]">
                  {user.name} {user.lastname}
                </h2>
                <p className="text-sm text-[#6B6B6B] font-sans-elegant mt-1">
                  {user.email}
                </p>
                <span className="inline-block mt-3 px-3 py-1 bg-[#F8F8F8] text-[#1A1A1A] text-xs font-sans-elegant tracking-wide uppercase">
                  {user.role === 'seller' ? 'Vendedora' : 'Compradora'}
                </span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleUpdate} className="p-8">
            <div className="bg-white border border-[#E5E5E5] p-6">
              <h3 className="text-xs font-sans-elegant font-medium text-[#1A1A1A] mb-6 uppercase tracking-wider flex items-center gap-2">
                <User size={16} className="text-[#6B6B6B]" />
                Información Personal
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-sans-elegant text-[#6B6B6B] uppercase tracking-wide mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border font-sans-elegant text-[#1A1A1A] transition-all duration-200 ${
                      isEditing 
                        ? 'border-[#E5E5E5] bg-white focus:border-[#1A1A1A] focus:outline-none' 
                        : 'border-[#E5E5E5] bg-[#F8F8F8] cursor-not-allowed'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans-elegant text-[#6B6B6B] uppercase tracking-wide mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border font-sans-elegant text-[#1A1A1A] transition-all duration-200 ${
                      isEditing 
                        ? 'border-[#E5E5E5] bg-white focus:border-[#1A1A1A] focus:outline-none' 
                        : 'border-[#E5E5E5] bg-[#F8F8F8] cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="text-xs font-sans-elegant text-[#6B6B6B] uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Mail size={14} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border font-sans-elegant text-[#1A1A1A] transition-all duration-200 ${
                    isEditing 
                      ? 'border-[#E5E5E5] bg-white focus:border-[#1A1A1A] focus:outline-none' 
                      : 'border-[#E5E5E5] bg-[#F8F8F8] cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Actions */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] text-white font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#333333] transition-all duration-200"
                >
                  <Save size={16} />
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setAvatarPreview(null);
                    setFormData({
                      name: user.name || "",
                      lastname: user.lastname || "",
                      email: user.email || "",
                      avatar: user.avatar || ""
                    });
                  }}
                  className="flex-1 py-3 border border-[#1A1A1A] text-[#1A1A1A] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>

          {/* Danger Zone */}
          <div className="border-t border-[#E5E5E5] p-8">
            <div className="border border-[#E5E5E5] bg-[#F8F8F8] p-5">
              <h3 className="text-xs font-sans-elegant font-medium text-[#1A1A1A] mb-2 uppercase tracking-wider">
                Zona de Peligro
              </h3>
              <p className="text-sm text-[#6B6B6B] font-sans-elegant mb-4">
                Una vez eliminada tu cuenta, no podrás recuperarla. Por favor, asegúrate antes de continuar.
              </p>
              <button
                type="button"
                onClick={handleDeleteUser}
                className="flex items-center gap-2 px-4 py-2 border border-[#1A1A1A] text-[#1A1A1A] font-sans-elegant text-xs tracking-[0.15em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
              >
                <Trash2 size={14} />
                Eliminar mi cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
