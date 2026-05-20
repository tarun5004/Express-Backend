
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-400 font-bold text-slate-950">
              A
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Authflow
              </p>
              <p className="text-sm text-slate-400">Secure member dashboard</p>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="mb-5 inline-flex rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              Account access
            </p>
            <h1 className="text-5xl font-semibold leading-tight tracking-tight">
              Authflow member portal
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Sign in or create an account to continue to your workspace.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {['Access', 'Session', 'Profile'].map((item) => (
              <div key={item}>
                <p className="text-sm font-semibold text-white">{item}</p>
                <div className="mt-3 h-1 rounded-sm bg-emerald-400" />
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default AuthLayout
