export function errorMessage(message: string) {
  return (
    <div className="rounded-lg p-4 bg-red-200 text-red-700 w-fit">
      {message}
    </div>
  );
}

export default errorMessage;
