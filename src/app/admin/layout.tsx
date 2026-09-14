'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // If we are on the login page, don't show the admin sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Equipment', href: '/admin/equipment', icon: '🚜' },
    { name: 'Inquiries', href: '/admin/inquiries', icon: '📩' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-neutral-800">
          <Link href="/" className="text-2xl font-black text-white tracking-tighter block">
            IRON<span className="text-orange-500">MARKET</span>
          </Link>
          <div className="text-xs text-neutral-500 uppercase tracking-widest mt-1 font-semibold">Admin Panel</div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-orange-500/10 text-orange-500'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-neutral-400 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <span className="mr-3">🚪</span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header (Mobile only) */}
        <header className="md:hidden bg-neutral-900 border-b border-neutral-800 p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-white">Admin Dashboard</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
