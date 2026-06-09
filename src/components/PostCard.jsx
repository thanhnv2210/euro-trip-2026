// Milestone 2 placeholder
export default function PostCard({ post }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3.5">
      <div className="font-semibold text-slate-100">{post.title || 'Untitled'}</div>
      <div className="text-xs text-slate-400 mt-0.5">{post.date} · {post.city}</div>
      {post.body && <p className="text-sm text-slate-300 mt-2 line-clamp-3">{post.body}</p>}
    </div>
  )
}
