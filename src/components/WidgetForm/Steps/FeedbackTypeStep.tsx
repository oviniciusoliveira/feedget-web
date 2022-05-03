import { CloseButton } from "../CloseButton";
import { feedbackOptions, FeedbackType } from "../WidgetForm";

type FeedbackTypeStepProps = {
  onFeedbackTypeSelect: (feedbackType: FeedbackType) => void;
};

export function FeedbackTypeStep({
  onFeedbackTypeSelect,
}: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>

        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackOptions).map(([key, value]) => (
          <button
            className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
            type="button"
            onClick={() => onFeedbackTypeSelect(key as FeedbackType)}
            key={key}
          >
            <img src={value.image.source} alt={value.image.alt} />
            <span>{value.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
