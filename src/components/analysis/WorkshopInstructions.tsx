const WorkshopInstructions = () => {
  const instructions = [
    {
      id: 1,
      text: "Use scrim code : DKEEH.",
    },
    {
      id: 2,
      text: '"Enable workshop inspector" and "Enable workshop inspector log file" should be on "ON" in your settings.',
    },
    {
      id: 3,
      text: '"Enable log generator" should be on "ON" in the lobby settings.',
    },
    {
      id: 4,
      text: 'By default, you\'ll find your logs in the "Overwatch" folder (C:\\Users\\YourName\\Documents\\Overwatch\\Workshop).',
    },
    {
      id: 5,
      text: "Import the logs file directly in our tool (you can import multiple files at once).",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {instructions.map((instruction) => (
        <div key={instruction.id} className="flex flex-wrap">
          <span className="inline bg-neutral-900 text-white align-middle text-center text-lg rounded-full w-8 h-8 mr-2">
            {instruction.id}
          </span>
          <span className="flex-1 flex-wrap">{instruction.text}</span>
        </div>
      ))}
    </div>
  );
};

export default WorkshopInstructions;
