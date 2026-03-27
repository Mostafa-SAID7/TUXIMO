import { Skeleton } from "@/components/ui/skeleton";

export const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
            <Skeleton className="w-20 h-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-20 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
          
          <div className="max-w-xs mb-12">
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>

          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>

      {/* About Section Skeleton */}
      <div className="py-12 px-6">
        <div className="container mx-auto text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-8 rounded-full" />
          <Skeleton className="h-16 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-2" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-2" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
      </div>

      {/* Cards Section Skeleton */}
      <div className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-32 h-6" />
            </div>
            <Skeleton className="w-20 h-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Page Header Skeleton */}
      <div className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-8 rounded-full" />
          <Skeleton className="h-16 w-2/3 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Skeleton className="h-96 w-full rounded-2xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="border-t border-border/30 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FormPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-24 h-6" />
            </div>
            <Skeleton className="w-20 h-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Form Header Skeleton */}
      <div className="pt-32 pb-8 px-6">
        <div className="container mx-auto max-w-md text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-8 rounded-full" />
          <Skeleton className="h-12 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>
      </div>

      {/* Form Skeleton */}
      <div className="pb-16 px-6">
        <div className="container mx-auto max-w-md">
          <Skeleton className="h-[500px] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};
