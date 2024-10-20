interface Props {
  img: string;
  stepNumber: number;
  stepTitle: string;
  description: string;
}

export default function StepCard({
  img,
  stepNumber,
  stepTitle,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center w-full max-w-[400px] hover:shadow-lg hover:border-color  p-6 rounded-lg transition-all duration-300 hover:-translate-y-2 border">
      <div className="text-xl flex items-center justify-center font-semibold mb-5">
          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 text-white mr-2">
            {stepNumber}
          </span>
          {stepTitle}
        </div>
      <div className="border rounded-lg cursor-default p-4 h-60 w-full flex items-center justify-center transition-all hover:shadow-md">
        {img && (
          <img
            className="object-contain rounded-lg max-h-full w-auto"
            src={img}
            alt=""
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-2 mt-4 w-full text-center">
        <div className="text-gray-600 mt-2">{description}</div>
      </div>
    </div>
  );
}