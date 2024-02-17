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
    <div className={"flex flex-col w-full max-w-[400px] "}>
      <div className="border rounded-lg cursor-default p-3 h-60 max-w-fit transition-all hover:shadow">
        {img && (
          <img
            className={"object-scale-down rounded-lg h-full"}
            src={img}
            alt={""}
          ></img>
        )}
      </div>
      <div className="flex flex-col gap-1 flex-grow">
        <div className="text-xl flex font-semibold mt-4">
          <span
            className={
              "w-8 h-8 rounded-full text-center bg-neutral-900 text-white mr-2"
            }
          >
            {stepNumber}
          </span>
          {stepTitle}
        </div>
        <div className="text-gray-600 mt-2">{description}</div>
      </div>
    </div>
  );
}
