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
    <div className={"flex flex-col gap-2"}>
      <div className="bg-white border rounded-lg cursor-default w-full h-60 max-w-[500px] transition-all hover:shadow hover:-translate-y-2">
        {img && (
          <img className={"object-cover rounded-lg"} src={img} alt={""}></img>
        )}
      </div>
      <div className="text-xl flex font-semibold mt-4">
        <span
          className={
            "w-8 h-8 rounded-full text-center bg-neutral-900 text-white mr-2"
          }
        >
          {stepNumber}
        </span>{" "}
        {stepTitle}
      </div>
      <div className="text-gray-600 mt-2">{description}</div>
    </div>
  );
}
