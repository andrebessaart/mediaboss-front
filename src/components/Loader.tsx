// components/Loader.tsx
export default function Loader() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary border-opacity-80"></div>
    </div>
  );
}
