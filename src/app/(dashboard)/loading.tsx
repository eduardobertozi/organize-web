import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className="bg-background fixed inset-0 flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="border-primary absolute inset-0 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border-2"
              style={{
                animationDelay: `${i * 0.5}s`,
                opacity: 0.2,
              }}
            />
          ))}

          <div className="bg-background relative z-10 rounded-full p-4 shadow-lg">
            <Loader2 className="text-primary h-12 w-12 animate-spin" />
          </div>
        </div>

        <div className="bg-muted h-1 w-48 overflow-hidden rounded-full">
          <div
            className="bg-primary h-full w-full origin-left animate-[shimmer_2s_ease-in-out_infinite]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, var(--primary) 50%, transparent 100%)',
              animation: 'loading-bar 2s ease-in-out infinite',
            }}
          />
        </div>

        <div className="text-muted-foreground animate-pulse text-lg font-medium">
          Carregando...
        </div>
      </div>
    </div>
  )
}

export default Loading
