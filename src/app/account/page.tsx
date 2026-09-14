import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function AccountPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              {session.user?.image ? (
                <img src={session.user.image} alt={session.user.name || ''} className="w-16 h-16 rounded-full" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-xl font-bold">
                  {session.user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">{session.user?.name}</h2>
                <p className="text-neutral-400">{session.user?.email}</p>
              </div>
            </div>
            <hr className="border-neutral-800 my-6" />
            <nav className="space-y-2">
              <a href="#" className="block px-4 py-2 rounded-lg bg-orange-500/10 text-orange-500 font-medium">My Favorites</a>
              <a href="#" className="block px-4 py-2 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition">My Inquiries</a>
              <a href="#" className="block px-4 py-2 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition">Account Settings</a>
            </nav>
          </div>
        </div>
        
        <div className="col-span-2">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Saved Machines</h3>
            
            <div className="text-center py-12 bg-neutral-950 rounded-lg border border-neutral-800 border-dashed">
              <svg className="mx-auto h-12 w-12 text-neutral-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">No favorites yet</h3>
              <p className="text-neutral-400 max-w-sm mx-auto mb-6">
                You haven't saved any equipment. Browse the catalog and click the heart icon to save machines here.
              </p>
              <a href="/equipment" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                Browse Equipment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
