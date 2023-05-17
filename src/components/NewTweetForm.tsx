import { useSession } from "next-auth/react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import TextArea from "./TextArea";
import { type FormEvent, useRef, useState } from "react";
import useAutosizeTextArea from "~/hooks/useAutosizeTextArea";
import { api } from "~/utils/api";

export default function NewTweetForm({}) {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const trpcUtils = api.useContext();

  useAutosizeTextArea(textAreaRef.current, inputValue);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      // console.log(newTweet);
      setInputValue("");

      if (session.status !== "authenticated") {
        return;
      }

      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData === undefined || oldData.pages[0] === undefined)
          return oldData;

        const newCacheTweet = {
          ...newTweet,
          likeCount: 0,
          likedByMe: false,
          user: {
            id: session.data?.user.id,
            name: session.data.user.name || null,
            image: session.data.user.image || null,
          },
        };

        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              tweets: [newCacheTweet, ...oldData.pages[0].tweets],
            },
            ...oldData.pages.slice(1),
          ],
        };
      });
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    createTweet.mutate({ text: inputValue });
  }

  if (session.status !== "authenticated") return <></>;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <TextArea
          ref={textAreaRef}
          rows={1}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's happening?"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </div>

      <Button className="self-end">Tweet</Button>
    </form>
  );
}
