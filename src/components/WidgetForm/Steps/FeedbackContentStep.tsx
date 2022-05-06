import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { Loading } from "../../Loading";
import { CloseButton } from "../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";
import { feedbackOptions, FeedbackType } from "../WidgetForm";

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
};

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [sendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackOption = feedbackOptions[feedbackType];

  async function handleSubmitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSendingFeedback(true);

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot,
      });
    } catch (err) {
      console.error(err);
    }

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackOption.image.source}
            alt={feedbackOption.image.alt}
            className="w-6 h-6"
          />
          {feedbackOption.title}
        </span>

        <CloseButton />
      </header>

      <form
        onSubmit={handleSubmitFeedback}
        className="flex flex-col  my-4 w-full"
      >
        <textarea
          onChange={(event) => setComment(event.target.value)}
          value={comment}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrolbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenshot={screenshot}
          />

          <button
            disabled={comment.length === 0 || sendingFeedback}
            type="submit"
            className="flex-1 p-2 bg-brand-500 rounded-md border-transparent flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {sendingFeedback ? <Loading /> : "Enviar Feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
