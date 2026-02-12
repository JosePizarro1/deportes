export const dynamic = "force-static";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-50 flex flex-col items-center justify-center gap-6 px-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-semibold">Panel Admin</h1>
        <p className="text-slate-300">
          Ruta reservada para el superadmin. Conecta la lógica de autenticación y autorización antes de exponerla.
        </p>
        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="text-xl font-medium mb-2">Próximos pasos</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-200">
            <li>Proteger esta ruta con tu middleware de auth/roles.</li>
            <li>Listar usuarios y asignar roles (admin, super_admin).</li>
            <li>Conectar acciones de gestión (crear, desactivar, reset password).</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
